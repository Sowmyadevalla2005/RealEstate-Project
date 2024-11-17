import { useSelector, useDispatch } from 'react-redux'; // Import dispatch from Redux
import { useState, useRef, useEffect } from 'react'; // Import useState and useEffect hooks
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch(); // Dispatch action
  const fileRef = useRef(null);
  const { currentUser, error, updateSuccess } = useSelector((state) => state.user); // Get error and updateSuccess from Redux state

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
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase'> update </button>
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
    </div>
  );
}
