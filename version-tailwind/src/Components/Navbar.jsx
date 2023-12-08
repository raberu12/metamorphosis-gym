import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from './UserContext'

function Navbar() {
  const navigate = useNavigate()
  const { userData, updateUser } = useUserContext()
  const navLinks = [
    { to: '/gym', text: 'Find A Gym' },
    { to: '/training', text: 'Training' },
    { to: '/blog', text: 'Blog' },
    { to: '/about', text: 'About' },
  ]

  const isLoggedIn = userData && userData.id

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        console.log('Logout successful')
        localStorage.removeItem('token')
        updateUser({}) // Clear the user data in the context
        navigate('/login')
        console.log()
        console.log()
      } else {
        // Logout failed
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const renderRegisterOrLogout = () => {
    if (isLoggedIn) {
      // If logged in, show Logout button
      return (
        <li className="flex w-24 items-center justify-center rounded-lg p-1 transition duration-500 ease-in-out hover:bg-gray-500">
          <button onClick={handleLogout}>Logout</button>
        </li>
      )
    } else {
      // If not logged in, show Register link
      return (
        <li className="flex w-24 items-center justify-center rounded-lg p-1 transition duration-500 ease-in-out hover:bg-gray-500">
          <Link to="/register">Register</Link>
        </li>
      )
    }
  }

  return (
    <div className="flex items-center justify-between bg-navbar">
      <div className="ml-4 text-lg font-bold text-white">
        {' '}
        <Link to="/">
          <img src="./images/logo.png" alt="Logo" className="ml-4 w-20" />
        </Link>
      </div>
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
          {/* Conditionally render Register or Logout */}
          {renderRegisterOrLogout()}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
