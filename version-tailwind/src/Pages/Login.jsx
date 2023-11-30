import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BsEnvelope,
  BsPerson,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from 'react-icons/bs'
import { FaLock, FaGoogle } from 'react-icons/fa'

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log('Login Response:', response.status, data)

      if (response.ok) {
        localStorage.setItem('token', data.token)
        setLoginError('')
        setIsLoggedIn(true)
        navigate('/')
      } else {
        setLoginError(data.message)
      }
      console.log('Login Response:', response.status, data)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <>
      <div className="m-20 flex h-screen flex-col items-center">
        <h2 className="mt-18 text-center text-7xl font-bold">
          WELCOME TO METAMORPHOSIS GYM
        </h2>
        <div className="mt-20 flex h-screen w-1/3 flex-col rounded-md bg-zinc-800">
          <div className="mt-3 text-center text-xl font-semibold text-white">
            <h2 className="mb-10 mt-10 text-5xl font-bold italic">LOGIN</h2>
            <div>USERNAME</div> {/* Changed from email to username */}
            <BsEnvelope className="absolute h-8 w-28 p-1 text-black" />
            <input
              className="mb-10 w-10/12 rounded-md p-1 text-center text-black"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              PASSWORD
              <FaLock className="absolute h-8 w-28 p-1 text-black" />
              <div>
                <input
                  className="mb-10 w-10/12 rounded-md p-1 text-center text-black"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <BsFillEyeSlashFill
                    onClick={togglePasswordVisibility}
                    className="absolute ml-2 inline-block h-8 shrink-0 cursor-pointer text-white"
                  />
                ) : (
                  <BsFillEyeFill
                    onClick={togglePasswordVisibility}
                    className="absolute ml-2 inline-block h-8 shrink-0 cursor-pointer text-white"
                  />
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center text-center text-sm">
              <div className="h-10 w-96 font-semibold">
                <button
                  className="mb-4 h-12 w-24 transform items-center justify-center rounded-md bg-zinc-900 transition-transform duration-300 hover:scale-110 hover:bg-neutral-700"
                  type="button"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
                <p className="flex justify-center">Or</p>

                <a
                  href="https://www.gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="mb-2 mt-4 h-12 w-48 transform items-center justify-center rounded-md bg-zinc-900 transition-transform duration-300 hover:scale-110 hover:bg-neutral-700"
                    type="button"
                  >
                    <img
                      className="inline-block h-8 w-8"
                      src="./images/google_logo.png"
                      alt="google logo"
                    ></img>
                    CONTINUE TO GOOGLE
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
