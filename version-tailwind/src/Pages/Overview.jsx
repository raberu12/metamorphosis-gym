import { Link } from 'react-router-dom';
import React from 'react';

function Overview() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-dark-elixir text-center'>
        <h2 className='text-8xl font-extrabold ml-36 mb-24'>
          SUBSCRIBE TO A <br /> MEMBERSHIP PLAN <br /> TO UNLOCK THIS PAGE
        </h2>
        <Link to="/MembershipPage">
            <button className=' cursor-pointertext-xl rounded-xl w-32 h-12 ml-36 bg-orangish text-white transition-transform transform hover:scale-110 transition-duration-300 hover:bg-orange-800 font-bold'> CLICK HERE </button>
        </Link>
      </div>
    </div> 
    
  );
}

export default Overview;
