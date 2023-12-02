import React, { useState } from 'react'
import {
  BsEnvelope,
  BsPerson,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [resetFields, setResetFields] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword,
    )
  }
  const handleRegister = async () => {
    try {
      // Reset errors on each registration attempt
      setEmailError('')
      setPasswordMatchError('')

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email format')
        return
      }

      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setPasswordMatchError("Passwords don't match")
        return
      }

      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()
      console.log(data.message)

      // Check if registration was successful
      if (response.ok) {
        setIsRegistered(true)
        setResetFields(true)
        navigate('/login')
      } else {
        setIsRegistered(false)
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setIsRegistered(false)
    }
  }

  const handleReset = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setResetFields(false)
    setIsRegistered(false)
  }

  return (
    <>
      <div className="m-20 flex h-screen flex-col items-center">
        <h1 className="mt-18 text-center text-7xl font-extrabold">
          WELCOME TO METAMORPHOSIS GYM
        </h1>
        <div className="mt-20 flex h-auto w-1/3 flex-col rounded-md bg-zinc-800 text-center ">
          <div className="mt-3 text-xl font-semibold text-white">
            <h2 className="mb-10 mt-10 text-5xl font-bold italic">REGISTER</h2>

            <div>
              USERNAME
              <BsPerson className="absolute h-8 w-28 ml-2 mt-1 text-black" />
              <input
                className="mb-10 w-10/12 rounded-md p-1 text-center text-black"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <div>EMAIL</div>
              <BsEnvelope className="absolute h-8 w-28 p-1 ml-2 mt-1 text-black" />
              <input
                className="mb-10 w-10/12 rounded-md p-1 text-center text-black"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              PASSWORD
              <FaLock className="absolute h-8 w-28 p-1 ml-2 mt-1 text-black" />
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

            <div>
              CONFIRM PASSWORD
              <FaLock className="absolute h-8 w-28 p-1 ml-2 mt-1 text-black" />
              <div>
                <input
                  className="w-10/12 rounded-md p-1 text-center text-black"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? (
                  <BsFillEyeSlashFill
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute ml-2 inline-block h-8 shrink-0 cursor-pointer text-white"
                  />
                ) : (
                  <BsFillEyeFill
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute ml-2 inline-block h-8 shrink-0 cursor-pointer text-white"
                  />
                )}
              </div>
            </div>

            <div className="mt-2 font-semibold text-red-500">
              {emailError && <div>{emailError}</div>}
              {passwordMatchError && <div>{passwordMatchError}</div>}
            </div>

            <div className="mt-14 grid grid-rows-2 items-center justify-center text-center text-sm">
              <div className="h-10 w-96 font-semibold">
                <button
                  className="mr-10 h-12 w-24 transform rounded-md bg-zinc-900 transition-transform duration-300 hover:scale-110 hover:bg-neutral-700"
                  type="button"
                  onClick={() => {
                    handleRegister()
                    handleReset()
                  }}
                >
                  REGISTER
                </button>
                <button
                  className="mb-12 ml-10 h-12 w-24 transform rounded-md bg-zinc-900 transition-transform duration-300 hover:scale-110 hover:bg-neutral-700"
                  type="button"
                  onClick={() => {
                    // Navigate to login page on button click
                    navigate('/login')
                  }}
                >
                  LOGIN
                </button>
              </div>
            </div>
            {isRegistered && (
              <div className="mt-4 font-semibold text-green-500">
                Successfully registered! You can now log in.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
