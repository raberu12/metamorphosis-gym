import { useState, useEffect } from "react";

function Consultation() {
  const [trainerNames, setTrainerNames] = useState([]);

  useEffect(() => {
    // Fetch the trainer names from the API endpoint
    fetch('http://localhost:3001/trainer-name')
      .then(response => response.json())
      .then(data => setTrainerNames(data))
      .catch(error => console.error('Error fetching trainer names:', error));
  }, []);




  return (
    <>
      <h1 className='ml-56 mb-8 text-7xl font-extrabold text-dark-elixir'>BOOK A CONSULTATION</h1>
      <form className='flex flex-col items-center ml-24 mt-16 h-full mb-80'>
        <div className='bg-black text-white w-2/5 h- mr-16 rounded-lg'>
          <h2 className='text-center font-bold text-5xl my-10'>CONSULTATION FORM</h2>
          <div className='flex flex-wrap justify-between px-8 mr-6 mt-4 '>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Name</h3>
                <input type="text" className='w-64 h-8 text-black  rounded-sm' />
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
                <input type="number" className='w-64 h-8 text-black rounded-sm' />
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
                {trainerNames.map((trainerName, index) => (
                  <option key={index} value={trainerName}>{trainerName}</option>
                ))}
              </select>
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
      </form>
    </>
  );
}

export default Consultation;
