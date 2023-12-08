import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from './UserContext'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

function Sidebar() {
  const navigate = useNavigate()
  const { userData, updateUser } = useUserContext()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUserSubscribed, setIsUserSubscribed] = useState(
    userData && userData.membership !== 'unsubscribed'
  );

  const areObjectsEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token')

        if (token) {
          const response = await fetch('http://localhost:3001/user-id', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          })

          if (response.ok) {
            const data = await response.json()

            // Check for undefined and replace it with the default value
            const updatedUserData = {
              ...data,
              membership:
                data.membership !== undefined ? data.membership : 'default',
            }

            if (!areObjectsEqual(userData, updatedUserData)) {
              // Update the user data in the context only if it has changed
              updateUser(updatedUserData)
            }
          } else {
            console.error(
              'Failed to fetch user information:',
              response.statusText,
            )
          }
        }
      } catch (error) {
        console.error('Error during user information fetch:', error)
      }
    }

    fetchUserInfo()
  }, [updateUser, userData])

  useEffect(() => {
    setIsUserSubscribed(userData && userData.membership !== 'unsubscribed')
  }, [userData])


  const sidebarLinks = [
    {
      to: isUserSubscribed ? '/overviewmember' : '/OverviewPage',
      text: 'Overview',
    },
    { to: '/MembershipPage', text: 'Membership' },
    { to: '/ConsultationPage', text: 'Consultation' },
  ]

  const sidebarIcon = {
    OverviewPage: './images/overviewicon.png',
    overviewmember: './images/overviewicon.png',
    MembershipPage: './images/membership.png',
    ConsultationPage: './images/consultation.png',
  }

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
        localStorage.removeItem('token')
        updateUser({}) // Clear the user data in the context
        navigate('/login')
      } else {
        // Logout failed
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  if (!userData || !userData.username) {
    return null
  }

  return (
    <div className="relative flex">
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      <div
        className={`fixed mx-auto h-full ${
          isCollapsed ? 'w-0' : 'w-52'
        } z-20 overflow-hidden bg-dark-elixir text-white transition-all duration-300`}
      >
        <div className="flex flex-col text-center">
          <div className={`mb-20 mt-8 ${isCollapsed ? 'hidden' : 'block'}`}>
            <img
              src="./images/icon.png"
              alt="profile pic"
              className="ml-14 w-24"
            />
            {userData.username && <h2 className="mt-8">{userData.username}</h2>}
            {userData.role && <h2>{userData.role}</h2>}
          </div>
          <ul>
            {sidebarLinks.map((link, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center hover:bg-sidebar"
              >
                <img
                  src={sidebarIcon[link.to.replace('/', '')]}
                  alt={`${link.text} icon`}
                  className="mb-4 ml-4 mt-3 h-8 w-8"
                />

                <Link
                  to={link.to}
                  className="ml-2 text-center"
                  activeclassname="active bg-sidebar"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`fixed ml-8 mt-64 ${isCollapsed ? 'hidden' : 'block'}`}>
          <button
            className="transition-duration-300 h-12 w-36 transform cursor-pointer rounded-xl bg-orangish text-lg transition-transform hover:scale-110 hover:bg-orange-800"
            onClick={handleLogout}
          >
            <img
              src="./images/log-out.png"
              className="absolute ml-4 h-8 w-8"
              alt="logout icon"
            ></img>
            <p className="ml-8">Log out</p>
          </button>
        </div>
        <button
          className="fixed right-4 top-4 z-10 rounded-full border border-navbar bg-white p-4 text-black transition-colors duration-300 hover:bg-orangish"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
