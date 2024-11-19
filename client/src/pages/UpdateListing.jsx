import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function CreateListing() {
  const currentUser = useSelector(state => state.user.currentUser);
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // Assuming the API returns an object with imageUrls
      setFormData({
        ...data,
        imageUrls: data.imageUrls || [], // Ensure imageUrls are properly set
      });
    };
    fetchListing();
  }, [params.listingId]);

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id
      });
    } else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      });
    } else if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleImageUpload = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentUser || !currentUser._id) {
      setError('User not logged in or invalid user data.');
      return;
    }
  
    try {
      setLoading(true);
      setError('');
  
      // Prepare the form data to include both the listing data and images
      const formDataToSubmit = new FormData();
  
      // Append regular form data
      formDataToSubmit.append('userRef', currentUser._id);
      formDataToSubmit.append('formData', JSON.stringify(formData)); // Assuming `formData` is an object
  
      // If there are files, append them to FormData
      if (files.length > 0) {
        files.forEach((file) => {
          formDataToSubmit.append('images', file); // 'images' is the field name used in backend
        });
      }
  
      // Send the request to upload and update listing
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        body: formDataToSubmit, // Send FormData directly
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (data.success === false) {
        setError(data.message);
      } else {
        // Handle successful response, if needed
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  const uploadImages = (files) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uploadedUrls = files.map((file) => `/uploads/${file.name}`); // Make sure the path is correct
        resolve(uploadedUrls); // Return the uploaded image URLs
      }, 2000);
    });
  };  

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={handleImageUpload}
              className='p-3 border border-gray-300 rounded w-full'
              type="file"
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              className='p-3 border border-slate-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              disabled={files.length === 0}
            >
              Upload
            </button>
          </div>
          {formData.imageUrls.length > 0 && (
            <div className="flex gap-4 mt-4 flex-col">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-10 h-10 object-cover rounded-full border-2 border-gray-300"
                  />
                  <span className="absolute bottom-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Update listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
