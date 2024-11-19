import { useSelector, useDispatch } from 'react-redux'; // Import dispatch from Redux
import { useState, useRef, useEffect } from 'react'; // Import useState and useEffect hooks
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import {Link} from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch(); // Dispatch action
  const fileRef = useRef(null);
  const { currentUser, error, updateSuccess } = useSelector((state) => state.user); // Get error and updateSuccess from Redux state
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',  
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message)); // Corrected typo: Use dispatch() instead of dispatchEvent()
    }
  };

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    }
    catch(error) {
      dispatch(signOutUserFailure(data.message));
    }

  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if(data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    }
    catch(error) {
      setShowListingsError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile </h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*'/>
        <img 
          onClick={() => fileRef.current.click()}  
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
          src={currentUser.avatar} 
          alt='profile'
        />
        <input type='text' placeholder='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' id='email' />
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> update </button>
        <Link to={"/create-listing"} className='bg-slate-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95'> Create Listing </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'> Delete account </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'> Sign out </span>
      </div>

      <p className='text-red-700 mt-5'> 
        {error ? error : ''} 
      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='text-gray-700 w-full'> Show Listings </button>
      <p className='text-red-700 mt-5'> {showListingsError ? 'Error showing listings' : ''}</p>
      
      {userListings && userListings.length > 0 &&
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'> Your Listings </h1>
        {userListings.map((listing) => (
        
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
            <Link className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/listing/${listing._id}`}> 
              <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain'/>
            </Link>
            <Link to={`/listing/${listing._id}`}>
              <p> {listing.name} </p>
            </Link>
            <div className='flex flex-col items-center'>
              <button className='text-slate-700 uppercase'> Delete </button>
              <button className='text-slate-700 uppercase'> Edit </button>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
