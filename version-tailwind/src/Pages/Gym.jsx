import React from 'react';

function Gym() {
  const locationData = [
    {
      address: '4F Ayala Malls Central Bloc, I. Villa Street, Apas, Cebu City, Cebu',
      image: './images/AyalaMalls.png',
      icon: './images/landmark.png',
    },
    {
      address: 'Oakridge Business Park, A.S. Fortuna Street, Mandaue City, Cebu',
      image: './images/OakRidge.png',
      icon: './images/landmark.png',
    },
    {
      address: 'Uptown IT Hub, JLU Centre Bloc, Rajah Sikatuna Avenue, Tagbilaran City, Bohol',
      image: './images/Uptown.png',
      icon: './images/landmark.png',
    },
    {
      address: '2F Lite Port Center, Celestino Gallares Street, Tagbilaran City, Bohol',
      image: './images/LitePort.png',
      icon: './images/landmark.png',
    },
    {
      address: 'In front of Outlet Mall in Pueblo Verde, Lapu-Lapu City, Cebu',
      image: './images/Outlet.png',
      icon: './images/landmark.png',
    },
    {
      address: 'Dumaguete Business Park, Calindagan Road, Dumaguete, Negros Oriental',
      image: './images/Dumaguete.png',
      icon: './images/landmark.png',
    },
  ];

  return (
    <>
      <div className="italic font-extrabold text-center mt-8 mb-16 text-dark-elixir">
        <h1 className='text-8xl'>Your Fitness Adventure Begins</h1>
        <h2 className='className="text-6xl mb-6 text-6xl'>Here's Our Available Gym</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center">
        {locationData.map((location, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              <img className="w-18 h-14" src={location.icon} alt="landmark" />
              <h2 className="text-lg font-bold text-center">{location.address}</h2>
            </div>
            <img src={location.image} alt={`Location ${index + 1}`} className="mt-2 w-96 h-56" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Gym;
