import React, { useState } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'

const LogInRegister = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [action, setAction] = useState("Register");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  
  return (
    <div className="bg-color-sky-50">
      <div className="text-black text-6xl font-bold text-center mt-28">WELCOME TO METAMORPHOSIS GYM</div>
      <div className="text-white flex flex-col mt-16 gap-1 mx-auto items-center my-36 w-full md:w-3/5 lg:w-2/5 xl:w-1/5 bg-zinc-800 rounded-lg p-5">
        <div className="flex flex-col items-center w-full mt-5">
          <div className="text-4xl font-bold">{action}</div>
        </div>
        <form className="flex flex-col items-center mt-5">
          {action === "Login" ? <div></div> : <div className="text-xl font-medium items-center w-full flex flex-col">USERNAME</div>}
          <div className="flex flex-col items-center mt-2">
            {action === "Login" ? <div></div> : <div className="text-black"><input type="text" id="username" /></div>}
          </div>
          <div className="text-xl font-medium items-center w-full flex flex-col">EMAIL</div>
          <div className="flex items-center mx-auto h-12 rounded-1g">
            <div className="text-black"><input type="email" id="email" /></div>
          </div>
          <div className="text-xl font-medium items-center w-full flex flex-col">PASSWORD</div>
          <div className="flex items-center mx-auto h-12 rounded-1g">
            <div className="text-black"><input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            </div>
            <input type="checkbox" onChange={handleTogglePassword}
            />
          </div>
          {action === "Login" ? <div></div> : <div className="text-xl font-medium items-center w-full flex flex-col">CONFIRM PASSWORD</div>}
          <div className="flex items-center mx-auto h-12 rounded-1g">
            <div className="text-black">{action === "Login" ? (<div></div>) : (<><input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange}
            />
              <input type="checkbox" onChange={handleToggleConfirmPassword}
              />
            </>)}</div>
          </div>
        </form>
        {action === "Register" ? <div className="text-center text-sm mb-4">
          Forget Password? <a href="#" className="text-blue-500 underline cursor-pointer" onClick={() => console.log("Forgot password clicked!")}>
      Click here!
    </a>
        </div> : null}
        <div className="flex w-28 bg-stone-700 rounded-md h-7 justify-center m-auto mt-2 transition-300 hover:bg-stone-900 cursor-pointer">
          <div id={action === "Register" ? "" : "submit"} onClick={() => { setAction("Register") }}>Register</div>
        </div>
        <div className="flex w-28 bg-stone-700 rounded-md h-7 justify-center m-auto mt-2 transition-300 hover:bg-stone-900 cursor-pointer">
          <div id={action === "Login" ? "" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default LogInRegister;