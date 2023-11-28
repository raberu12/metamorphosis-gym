import React, { useState } from 'react';
import { BsEnvelope, BsPerson, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FaLock, FaGoogle  } from 'react-icons/fa';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className='flex flex-col m-20 items-center h-screen'>
        <h2 className='text-center font-bold text-7xl mt-18'>WELCOME TO METAMORPHOSIS GYM</h2>
        <div className='flex flex-col h-screen w-1/3 mt-20 rounded-md bg-zinc-800'>
          <div className='text-center mt-3 text-white font-semibold text-xl'>
            <h2 className='text-5xl italic font-bold mt-10 mb-10'>LOGIN</h2>

            <div>
              EMAIL
            </div>
              <BsEnvelope className='text-black absolute p-1 h-8 w-28' />
              <input className='text-black w-10/12 rounded-md mb-10 p-1 text-center' type='email' />

            <div>
              PASSWORD
              <FaLock className='text-black absolute p-1 h-8 w-28' />
            <div>
            
              <input
                className='text-black w-10/12 rounded-md mb-10 p-1 text-center'
                type={showPassword ? 'text' : 'password'}
              />
              {showPassword ? (
                <BsFillEyeSlashFill
                  onClick={togglePasswordVisibility}
                  className='text-white ml-2 shrink-0 absolute h-8 inline-block cursor-pointer'
                />
              ) : (
                <BsFillEyeFill
                  onClick={togglePasswordVisibility}
                  className='text-white ml-2 shrink-0 absolute h-8 inline-block cursor-pointer'
                />
              )}
              </div>            
            </div>

            <div className='flex items-center justify-center mt-2 text-center text-sm'>
              <div className='w-96 h-10 font-semibold'>
                <button
                  className=' bg-zinc-900 justify-center items-center rounded-md transition-transform transform hover:scale-110 duration-300 hover:bg-neutral-700 mb-4 h-12 w-24'
                  type='button'
                >
                  LOGIN
                </button>
                <p className='flex justify-center'>Or</p>
                
                <a href='https://www.gmail.com' target='_blank' rel='noopener noreferrer'>
                <button
                  className='bg-zinc-900 justify-center items-center rounded-md transition-transform transform hover:scale-110 duration-300 hover:bg-neutral-700 mt-4 mb-2 h-12 w-48'
                  type='button'
                >
                  <img className='inline-block h-8 w-8' src='./images/google_logo.png' alt='google logo'></img>CONTINUE TO GOOGLE
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;