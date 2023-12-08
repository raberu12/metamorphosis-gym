import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import About from './Pages/About'
import Register from './Pages/Register'
import Gym from './Pages/Gym'
import MembershipPlans from './Pages/Membership'
import Sidebar from './Components/Sidebar'
import Consultation from './Pages/Consultation'
import Overview from './Pages/Overview'
import Training from './Pages/Training'
import Blog from './Pages/Blog'
import Login from './Pages/Login'
import { UserProvider, useUserContext } from './Components/UserContext'
import OverviewM from './Pages/OverviewM'
import Admin from './Pages/Admin'

const PrivateRoute = ({ element, adminOnly }) => {
  const { userData } = useUserContext()

  // Check if the user is an admin, otherwise redirect to login
  if (adminOnly && (!userData || userData.role !== 'admin')) {
    // You may want to redirect to a login page or show an access denied message
    return <Navigate to="/" />
  }

  return element
}

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="flex h-full items-start justify-start bg-cover bg-center"
        style={{ backgroundImage: "url('./images/hero-image.jpg')" }}
      >
        <div className="m-10">
          <h1 className="text-9xl font-bold text-white">
            IT'S ALL ABOUT WHAT YOU CAN ACHIEVE
          </h1>
          <p className="mt-4 text-xl italic text-white">
            Take control, transform your soul
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Why choose Metamorphosis Gym?
          </h2>
          <p className="mb-4 text-center text-xl">
            Here's what you'll gain with our membership
          </p>
          <div className="grid grid-cols-1 gap-4 p-1 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <img src="./images/support.png" alt="" className="w-32" />
              <h1 className="font-bold">Support</h1>
              <p className="h-40 overflow-hidden">
                When you join, you will receive a free personalized fitness
                plan. Our Friendly and expert coaches will assist your on your
                fitness journey
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="./images/equipment.png" alt="" className="w-32" />
              <h1 className="font-bold">Equipment</h1>
              <p className="h-40 overflow-hidden">
                We've got you covered with personalized support in the gym and
                handy tools to keep you on track while you're out and about.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="./images/convenience.png" alt="" className="w-32" />
              <h1 className="font-bold">Convenience</h1>
              <p className="h-40 overflow-hidden">
                Our members have access to over 5,100 workout locations
                worldwide, available 24/7 for their convenience.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="./images/community.png" alt="" className="w-32" />
              <h1 className="font-bold">Community</h1>
              <p className="h-40 overflow-hidden">
                Enrolling in an MG gym membership means joining a supportive
                community committed to achieving success in fitness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Sidebar />
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/OverviewPage" element={<Overview />} />
              <Route path="/MembershipPage" element={<MembershipPlans />} />
              <Route path="/ConsultationPage" element={<Consultation />} />
              <Route path="/training" element={<Training />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gym" element={<Gym />} />
              <Route path="/overviewmember" element={<OverviewM />} />
              <Route
                path="/admin/*"
                element={<PrivateRoute element={<Admin />} adminOnly />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
