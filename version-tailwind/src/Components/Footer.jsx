import React from 'react'
import { FaInstagram, FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="p-4 text-white mt-4">
      <div className="flex justify-center space-x-9">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 transform-gpu"
        >
          <div className="rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-2">
            <FaInstagram size="2em" />
          </div>
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 transform-gpu"
        >
          <div className="rounded-full bg-red-500 p-2">
            <FaYoutube size="2em" />
          </div>
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 transform-gpu"
        >
          <div className="rounded-full bg-blue-600 p-2">
            <FaFacebook size="2em" />
          </div>
        </a>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300 transform-gpu"
        >
          <div className="rounded-full bg-black p-2">
            <FaTiktok size="2em" />
          </div>
        </a>
      </div>
      <p className='text-black text-xl mt-4 text-center'>© Metamorphosis Gym Franchisor, LLC 2023. All rights reserved</p>
    </footer>
  )
}

export default Footer
