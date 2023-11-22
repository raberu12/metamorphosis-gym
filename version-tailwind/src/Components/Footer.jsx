import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SocialIcon = ({ to, icon, bgColor }) => (
  <li className={`rounded-full bg-${bgColor} m-2 p-2 text-4xl text-white`}>
    <Link to={to} target="_blank" rel="noopener noreferrer">
      {icon}
    </Link>
  </li>
)

const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-center">
      <ul className="m-4 flex gap-6">
        <SocialIcon
          to="https://www.facebook.com/"
          icon={<FaFacebookF />}
          bgColor="blue-600"
        />
        <SocialIcon
          to="https://www.instagram.com/"
          icon={<FaInstagram />}
          bgColor="gradient-to-tr from-yellow-300 via-red-600 to-purple-600"
        />
        <SocialIcon
          to="https://www.tiktok.com/"
          icon={<FaTiktok />}
          bgColor="black"
        />
        <SocialIcon
          to="https://www.youtube.com/"
          icon={<FaYoutube />}
          bgColor="red-600"
        />
      </ul>
    </footer>
  )
}

export default Footer
