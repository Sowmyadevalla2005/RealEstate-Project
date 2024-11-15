import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-900'> Sign Up </h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> Sign up </button>
      </form>
      <div className='mt-5 flex justify-center gap-2 text-slate-700'>
        <p> Have an account? </p>
        <Link to={'/sign-in'}>
          <span className='hover:underline'> Sign In </span>
        </Link>
      </div>
    </div>
  )
}
