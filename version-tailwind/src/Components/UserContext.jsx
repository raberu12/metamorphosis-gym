// Create a new context
import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const updateUser = (newUserData) => {
    setUserData(newUserData)
  }

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}