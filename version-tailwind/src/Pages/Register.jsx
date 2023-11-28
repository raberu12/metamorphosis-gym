import React, { useState } from 'react';
import { BsEnvelope, BsPerson, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <>
      <div className='flex flex-col m-20 items-center h-screen'>
        <h2 className='text-center font-bold text-7xl mt-18'>WELCOME TO METAMORPHOSIS GYM</h2>
        <div className='flex flex-col h-auto w-1/3 mt-20 rounded-md bg-zinc-800'>
          <div className='text-center mt-3 text-white font-semibold text-xl'>
            <h2 className='text-5xl italic font-bold mt-10 mb-10'>REGISTER</h2>

            <div>
              USERNAME
              <BsPerson className='text-black absolute h-8 w-28' />
              <input className='text-black w-10/12 rounded-md mb-10 p-1 text-center' type='text' />
            </div>

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

            <div>
              CONFIRM PASSWORD
              <FaLock className='text-black absolute p-1 h-8 w-28' />
              <input
                className='text-black w-10/12 rounded-md p-1 text-center'
                type={showConfirmPassword ? 'text' : 'password'}
              />
              {showConfirmPassword ? (
                <BsFillEyeSlashFill
                  onClick={toggleConfirmPasswordVisibility}
                  className='text-white ml-2 shrink-0 absolute h-8 inline-block cursor-pointer'
                />
              ) : (
                <BsFillEyeFill
                  onClick={toggleConfirmPasswordVisibility}
                  className='text-white ml-2 shrink-0 absolute h-8 inline-block cursor-pointer'
                />
              )}
            </div>

            <div className='grid grid-rows-2 items-center justify-center mt-14 text-center text-sm'>
              <div className='w-96 h-10 font-semibold'>
                <button
                  className=' bg-zinc-900 rounded-md transition-transform transform hover:scale-110 duration-300 hover:bg-neutral-700 mr-10 h-12 w-24'
                  type='button'
                >
                  REGISTER
                </button>
                Or
                <button
                  className='bg-zinc-900 rounded-md mb-12 transition-transform transform hover:scale-110 duration-300 hover:bg-neutral-700 ml-10 h-12 w-24'
                  type='button'
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;