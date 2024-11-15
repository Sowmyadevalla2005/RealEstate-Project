import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => { // e for event
    setFormData(
      {
        ...formData, // Spread operator
        [e.target.id]: e.target.value,
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent refreshing the page when we submit the form
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // stringify for security
      });
      const data = await res.json(); //Convert request to json
      console.log(data);
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch(error) {
      setLoading(false);
      setError(error.message);
    }   
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-700'> Sign Up </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? 'Loading' : 'Sign up'} </button>
      </form>
      <div className='mt-5 flex justify-center gap-2 text-slate-700'>
        <p> Have an account? </p>
        <Link to={'/sign-in'}>
          <span className='hover:underline'> Sign In </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'> {error} </p>}
    </div>
  )
}
