import {useSelector} from 'react-redux';
import { useRef } from 'react';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile </h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()}  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt='profile'/>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase'> update </button>
      </form>
    </div>
  )
}
