import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const navLinks = [
    { to: '/gym', text: 'Find A Gym' },
    { to: '/training', text: 'Training' },
    { to: '/blog', text: 'Blog' },
    { to: '/about', text: 'About' },
    { to: '/register', text: 'Register' },
  ]

  return (
    <div className="flex items-center justify-between bg-black">
      <div className="ml-4 text-lg font-bold text-white">LOGO HERE</div>
      <div className="container mx-auto flex justify-center">
        <ul className="flex h-20 space-x-16 font-bold text-white">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="flex w-24 items-center justify-center rounded-lg p-1 transition duration-500 ease-in-out hover:bg-gray-500"
            >
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
