import React from 'react';

function Consultation() {
  return (
    <>
      <h1 className='ml-56 mb-3 text-7xl font-extrabold text-dark-elixir'>BOOK A CONSULTATION</h1>
      <div className='flex flex-col items-center ml-64 mt-16 h-full'>
        <div className='bg-black text-white w-2/5 h- mr-16 rounded-lg'>
          <h2 className='text-center font-bold text-5xl mt-2'>CONSULTATION FORM</h2>
          <div className='flex flex-wrap justify-between px-8 mr-6 mt-4 '>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Name</h3>
                <input type="text" className='w-64 h-8 text-black border-none rounded-sm' />
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Email Address</h3>
                <input type="email" className='w-64 h-8 text-black rounded-sm' />
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Phone Number</h3>
                <input type="number" className='w-64 h-8 text-black rounded-sm appearance-none' />
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Select a Date</h3>
                <input type="date" className='w-64 h-8 text-black rounded-sm' />
              </label>
            </div>
            <div className=' flex-grow'>
              <label className='text-xl'>Select a Trainer</label>
              <select className='w-full h-8 text-black rounded-sm mb-4'>
                <option value="Trainer 1">Coach 1</option>
                <option value="Trainer 2">Coach 2</option>
                <option value="Trainer 3">Coach 3</option>
              </select>
              <label className='text-xl'>Message</label>
              <br/>
              <textarea className='w-full h-64 rounded-sm'></textarea>
            </div>      
          </div>
          <div className='text-center mt-4 mb-4'>
              <button 
                  type="submit" 
                  className=' text-white bg-orangish w-32 h-12 rounded-xl items
                  cursor-pointer text-lg hover:bg-orange-800 transition-transform transform hover:scale-110 transition-duration-300'>
                  Submit
              </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultation;
