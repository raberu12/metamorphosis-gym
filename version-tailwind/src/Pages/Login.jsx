// src/components/Login.js
import React, { useState } from 'react'
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Components/UserContext'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { updateUser } = useUserContext()


  const handleLogin = async () => {
    let token // Declare token here

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log('Login Response:', data)

      if (response.ok) {
        console.log('Login successful:', data)

        token = data.token
        localStorage.setItem('token', token)

        const decodedToken = jwtDecode(token)

        updateUser({
          id: decodedToken.id,
          role: decodedToken.role,
          membership: decodedToken.membership,
        })

        console.log('User Data:', decodedToken)
        console.log('User Role:', decodedToken.role)

        if (decodedToken.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        console.error('Login failed:', data.message)
      }
    } catch (error) {
      console.error('Login error:', error.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-md bg-zinc-800 p-16 text-center text-white shadow-md">
        <h2 className="mb-4 text-2xl font-bold italic">Login</h2>

        <div className="relative mb-4 flex flex-col">
          <div className="mb-2 text-2xl font-bold">USERNAME</div>
          <input
            type="text"
            id="username"
            className="w-full border p-3 pl-10 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <AiOutlineUser className="absolute left-3 top-3/4 -translate-y-1/2 transform text-black" />
        </div>

        <div className="relative mb-4 flex flex-col">
          <div className="mb-2 text-2xl font-bold">PASSWORD</div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full border p-3 pl-10 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AiOutlineLock className="absolute left-3 top-3/4 -translate-y-1/2 transform text-black" />
          <button
            className="absolute right-3 top-3/4 -translate-y-1/2 transform text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <div className="mt-auto flex justify-between">
          <button
            className="w-48 transform rounded-md bg-zinc-900 p-2 font-bold text-white transition duration-300 hover:scale-110 hover:bg-zinc-700"
            onClick={handleLogin}
          >
            Login
          </button>

          <Link to="/register">
            <button className="mx-3 w-48 transform rounded-md bg-zinc-900 p-2 font-bold text-white transition duration-300 hover:scale-110 hover:bg-zinc-700">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
