import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const sendRegistrationData = (registrationData) => {
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed')
        }
        return response.json()
      })
      .then((data) => {
        alert('Registration successful')
        navigate('/login')
      })
      .catch((error) => {
        alert('Registration failed. Please try again.')
        console.error('Registration error:', error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password, confirmPassword, firstname, lastname } =
      formData
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstname ||
      !lastname
    ) {
      alert('Please provide all required fields.')
      return
    }
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match.')
      return
    }
    const registrationData = {
      username,
      email,
      password,
      firstname,
      lastname,
    }
    sendRegistrationData(registrationData)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="h-5/7 mb-4 flex w-1/3 flex-col rounded bg-zinc-800 px-8 pb-8 pt-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="firstname"
          >
            FIRST NAME
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="firstname"
            type="firstname"
            placeholder="Enter your first name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="lastname"
          >
            LAST NAME
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="lastname"
            type="lastname"
            placeholder="Enter your last name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="email"
          >
            EMAIL
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="m-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="m-2 block text-center text-4xl font-bold italic text-white"
            htmlFor="confirmPassword"
          >
            CONFIRM PASSWORD
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="m-auto flex justify-center gap-3">
          <button
            className="focus:shadow-outline rounded bg-zinc-900 px-6 py-3 font-bold text-white transition duration-300 hover:scale-110 hover:bg-zinc-700"
            type="submit"
          >
            Register
          </button>
          <button
            className="focus:shadow-outline rounded bg-zinc-900 px-6 py-3 font-bold text-white transition duration-300 hover:scale-110 hover:bg-zinc-700"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
