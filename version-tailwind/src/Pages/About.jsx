import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'

function About() {
  return (
    <div>
      <div
        className="flex h-screen items-end justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('./images/landing-img.jpg')`,
          height: '600px',
        }}
      >
        <div className="bg-opacity-50 p-10 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            METAMORPHOSIS GYM
          </h1>
        </div>
      </div>
      <div className="text-center">
        <p className="mx-auto my-9 max-w-6xl text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          Welcome to Metamorphosis Gym, where we believe that fitness has the
          power to transform lives. Our goal is to empower individuals to become
          healthier and stronger versions of themselves by providing a
          supportive and motivating environment. We offer tailored fitness
          programs, expert guidance, and a community that inspires positive
          change. At Metamorphosis Gym, we believe that fitness is not just
          about achieving physical goals, but also about shaping a renewed and
          resilient version of yourself. Come join us and embark on a fitness
          journey that transcends the physical and transforms your life.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 mx-8 text-white">
        <div className="flex h-full w-full flex-col rounded-lg bg-white p-0 shadow-lg">
          <img
            className="mx-auto h-full w-full flex-1"
            src="./images/profile1.png"
            alt="Profile 1"
          />
          <div className="m-0 flex h-32 w-full flex-col justify-between bg-blue-900 p-0">
            <h2 className="text-center text-4xl font-bold">
              Ray Emanuel Patalinhug
            </h2>
            <p className="text-center text-sm">Trainer</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col rounded-lg bg-white p-0 shadow-lg">
          <img
            className="mx-auto h-full w-full flex-1"
            src="./images/profile2.jpg"
            alt="Profile 2"
          />
          <div className="m-0 flex h-32 w-full flex-col justify-between bg-blue-900 p-0">
            <h2 className="text-center text-4xl font-bold">
              Hiroshi Curimatmat
            </h2>
            <p className="text-center text-sm">Trainer</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col rounded-lg bg-white p-0 shadow-lg">
          <img
            className="mx-auto h-full w-full flex-1"
            src="./images/profile3.jpg"
            alt="Profile 3"
          />
          <div className="m-0 flex h-32 w-full flex-col justify-between bg-blue-900 p-0">
            <h2 className="text-center text-4xl font-bold">
              Jedd Christian Juab
            </h2>
            <p className="text-center text-sm">Trainer</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-col rounded-lg bg-white p-0 shadow-lg">
          <img
            className="mx-auto h-full w-full flex-1"
            src="./images/profile4.jpg"
            alt="Profile 4"
          />
          <div className="m-0 flex h-32 w-full flex-col justify-between bg-blue-900 p-0">
            <h2 className="text-center text-4xl font-bold">
              Matt Vincent Magdadaro
            </h2>
            <p className="text-center text-sm">Founder</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
