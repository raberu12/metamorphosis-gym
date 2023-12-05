import React, { useState, useEffect } from 'react'
import { useUserContext } from '../Components/UserContext'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const { userData } = useUserContext()
  console.log('User Data:', userData)
  const [employeeData, setEmployeeData] = useState([])
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    position: '',
    phoneNumber: '',
    workSchedule: '',
  })

  const [memberData, setMemberData] = useState([])
  const [editingMember, setEditingMember] = useState(null)
  const [showAddMemberForm, setShowAddMemberForm] = useState(false)
  const [newMember, setNewMember] = useState({
    username: '',
    email: '',
    role: '',
    membership: '',
  })

  const [totalCurrentEmployees, setTotalCurrentEmployees] = useState(0)
  const [totalCurrentMembers, setTotalCurrentMembers] = useState(0)

  const setCurrentEmployees = (employees) => setTotalCurrentEmployees(employees)
  const setCurrentMembers = (members) => setTotalCurrentMembers(members)

  useEffect(() => {
    fetchEmployeeData()
    fetchCounts()
    fetchMemberData()
    fetchTotalCurrentMembers()

    const intervalId = setInterval(() => {
      fetchCounts()
      fetchTotalCurrentMembers()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const fetchTotalCurrentMembers = () => {
    fetch('http://localhost:3001/api/totalCurrentMembers')
      .then((response) => response.json())
      .then((data) => {
        setCurrentMembers(data.totalCurrentMembers)
      })
      .catch((error) => console.error('Error fetching total members:', error))
  }

  const fetchEmployeeData = () => {
    fetch('http://localhost:3001/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployeeData(data))
      .catch((error) => console.error('Error fetching employee data:', error))
  }

  const fetchCounts = () => {
    fetch('http://localhost:3001/api/totalCurrentEmployees')
      .then((response) => response.json())
      .then((data) => {
        setCurrentEmployees(data.totalCurrentEmployees)
      })
      .catch((error) =>
        console.error('Error fetching total current employees:', error),
      )
  }

  const handleEditEmployee = (id) => {
    setEditingEmployee(id)
  }

  const handleCancelEditEmployee = () => {
    setEditingEmployee(null)
  }

  const handleSaveEditEmployee = (id, editedEmployee) => {
    fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        setEmployeeData((prevData) =>
          prevData.map((employee) =>
            employee.id === id ? editedEmployee : employee,
          ),
        )
        setEditingEmployee(null)
      })
      .catch((error) => {
        console.error('Error updating employee:', error)
      })
  }

  const handleDeleteEmployee = (id) => {
    fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        setEmployeeData((prevData) =>
          prevData.filter((employee) => employee.id !== id),
        )
      })
      .catch((error) => {
        console.error('Error deleting employee:', error)
      })
  }

  const handleEditFieldChangeEmployee = (id, field, value) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee,
      ),
    )
  }

  const handleNewEmployeeChange = (field, value) => {
    setNewEmployee((prevData) => ({ ...prevData, [field]: value }))
  }

  const handleAddNewEmployee = () => {
    fetch(`http://localhost:3001/api/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((newEmployeeFromServer) => {
        setEmployeeData((prevData) => [...prevData, newEmployeeFromServer])
        setNewEmployee({
          fullName: '',
          position: '',
          phoneNumber: '',
          workSchedule: '',
        })
        setShowAddEmployeeForm(false)
      })
      .catch((error) => {
        console.error('Error adding new employee:', error)
      })
  }

  const fetchMemberData = () => {
    fetch('http://localhost:3001/api/members')
      .then((response) => response.json())
      .then((data) => setMemberData(data))
      .catch((error) => console.error('Error fetching member data:', error))
  }

  const handleEditMember = (id) => {
    setEditingMember(id)
  }

  const handleCancelEditMember = () => {
    setEditingMember(null)
  }

  const handleSaveEditMember = (id, editedMember) => {
    fetch(`http://localhost:3001/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMember),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        setMemberData((prevData) =>
          prevData.map((member) => (member.id === id ? editedMember : member)),
        )
        setEditingMember(null)
      })
      .catch((error) => {
        console.error('Error updating member:', error)
      })
  }

  const handleDeleteMember = (id) => {
    fetch(`http://localhost:3001/api/members/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        setMemberData((prevData) =>
          prevData.filter((member) => member.id !== id),
        )
      })
      .catch((error) => {
        console.error('Error deleting member:', error)
      })
  }

  const handleEditFieldChangeMember = (id, field, value) => {
    setMemberData((prevData) =>
      prevData.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    )
  }

  const handleNewMemberChange = (field, value) => {
    setNewMember((prevData) => ({ ...prevData, [field]: value }))
  }

  const handleAddNewMember = () => {
    fetch(`http://localhost:3001/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((newMemberFromServer) => {
        setMemberData((prevData) => [...prevData, newMemberFromServer])
        setNewMember({
          username: '',
          email: '',
          role: '',
          membership: '',
        })
        setShowAddMemberForm(false)
      })
      .catch((error) => {
        console.error('Error adding new member:', error)
      })
  }

  return (
    <div className="ml-80">
      {/* Display Total Members */}
      <div className="mr-72 flex justify-center text-center">
        <div className="m-10 h-36 w-80 rounded-lg bg-white">
          <div className="mt-2 text-xl font-semibold">Total Members</div>
          <div className="p-5 text-5xl font-extrabold text-sky-900">
            {totalCurrentMembers} PEOPLE
          </div>
        </div>
        <div className="m-10 h-36 w-80 rounded-lg bg-white">
          <div className="mt-2 text-xl font-semibold">Total Employees</div>
          <div className="p-5 text-5xl font-extrabold text-sky-900">
            {totalCurrentEmployees} PEOPLE
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="flex">
        <div className="text-2xl font-medium">Employees</div>
        <button
          onClick={() => setShowAddEmployeeForm(!showAddEmployeeForm)}
          className="ml-10 flex h-10 items-center rounded-md bg-sky-900 p-1 text-center font-normal text-white transition-transform duration-300 hover:scale-105 hover:bg-sky-800"
        >
          + Add New Employee
        </button>
      </div>

      {showAddEmployeeForm && (
        <div className="mt-4">
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Full Name"
            value={newEmployee.fullName}
            onChange={(e) =>
              handleNewEmployeeChange('fullName', e.target.value)
            }
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) =>
              handleNewEmployeeChange('position', e.target.value)
            }
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Phone Number"
            value={newEmployee.phoneNumber}
            onChange={(e) =>
              handleNewEmployeeChange('phoneNumber', e.target.value)
            }
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Work Schedule"
            value={newEmployee.workSchedule}
            onChange={(e) =>
              handleNewEmployeeChange('workSchedule', e.target.value)
            }
          />
          <button
            className="ml-10 h-8 rounded-md bg-sky-900 p-1 text-center font-normal text-white transition-transform duration-300 hover:scale-105 hover:bg-sky-800"
            onClick={handleAddNewEmployee}
          >
            Add Employee
          </button>
        </div>
      )}

      <div>
        <table className="mt-2 w-10/12 bg-slate-50">
          <thead>
            <tr className="justify-center bg-gray-300 font-bold">
              <th className="p-2">FULL NAME</th>
              <th className="p-2">POSITION</th>
              <th className="p-2">PHONE NUMBER</th>
              <th className="p-2">WORK SCHEDULE</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr
                key={employee.id}
                className={employee.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="rounded-md p-6 text-center">
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.fullName}
                      onChange={(e) =>
                        handleEditFieldChangeEmployee(
                          employee.id,
                          'fullName',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    employee.fullName
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.position}
                      onChange={(e) =>
                        handleEditFieldChangeEmployee(
                          employee.id,
                          'position',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    employee.position
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.phoneNumber}
                      onChange={(e) =>
                        handleEditFieldChangeEmployee(
                          employee.id,
                          'phoneNumber',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    employee.phoneNumber
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.workSchedule}
                      onChange={(e) =>
                        handleEditFieldChangeEmployee(
                          employee.id,
                          'workSchedule',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    employee.workSchedule
                  )}
                </td>
                <td className="m-2 flex justify-center rounded-md bg-sky-400 p-1 text-xs transition-transform duration-100 hover:scale-105 hover:bg-sky-500">
                  {editingEmployee === employee.id ? (
                    <>
                      <button
                        className="mr-1"
                        onClick={() =>
                          handleSaveEditEmployee(employee.id, employee)
                        }
                      >
                        Save
                      </button>
                      <button
                        className="ml-1"
                        onClick={handleCancelEditEmployee}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditEmployee(employee.id)}>
                      Edit
                    </button>
                  )}
                </td>
                <td className="m-2 flex justify-center rounded-md bg-red-500 p-1 text-xs transition-transform duration-100 hover:scale-105 hover:bg-red-700">
                  <button onClick={() => handleDeleteEmployee(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Members Table */}
      <div className="mt-8 flex">
        <div className="text-2xl font-medium">Members</div>
        <button
          onClick={() => setShowAddMemberForm(!showAddMemberForm)}
          className="ml-10 flex h-10 items-center rounded-md bg-sky-900 p-1 text-center font-normal text-white transition-transform duration-300 hover:scale-105 hover:bg-sky-800"
        >
          + Add New Members
        </button>
      </div>

      {showAddMemberForm && (
        <div className="mt-4">
          {/* Adjust input fields based on your member data structure */}
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Username"
            value={newMember.username}
            onChange={(e) => handleNewMemberChange('username', e.target.value)}
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => handleNewMemberChange('email', e.target.value)}
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => handleNewMemberChange('role', e.target.value)}
          />
          <input
            className="mr-5 rounded-sm p-1 text-center"
            type="text"
            placeholder="Membership"
            value={newMember.membership}
            onChange={(e) =>
              handleNewMemberChange('membership', e.target.value)
            }
          />
          <button
            className="ml-10 h-8 rounded-md bg-sky-900 p-1 text-center font-normal text-white transition-transform duration-300 hover:scale-105 hover:bg-sky-800"
            onClick={handleAddNewMember}
          >
            Add Member
          </button>
        </div>
      )}

      <div>
        <table className="mb-16 mt-2 w-10/12 bg-slate-50">
          <thead>
            <tr className="justify-center bg-gray-300 font-bold">
              <th className="p-2">USERNAME</th>
              <th className="p-2">EMAIL</th>
              <th className="p-2">ROLE</th>
              <th className="p-2">MEMBERSHIP</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {memberData.map((member) => (
              <tr
                key={member.id}
                className={member.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="rounded-md p-6 text-center">
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.username}
                      onChange={(e) =>
                        handleEditFieldChangeMember(
                          member.id,
                          'username',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    member.username
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.email}
                      onChange={(e) =>
                        handleEditFieldChangeMember(
                          member.id,
                          'email',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) =>
                        handleEditFieldChangeMember(
                          member.id,
                          'role',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    member.role
                  )}
                </td>
                <td className="rounded-md p-6 text-center">
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.membership}
                      onChange={(e) =>
                        handleEditFieldChangeMember(
                          member.id,
                          'membership',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    member.membership
                  )}
                </td>
                <td className="m-2 flex justify-center rounded-md bg-sky-400 p-1 text-xs transition-transform duration-100 hover:scale-105 hover:bg-sky-500">
                  {editingMember === member.id ? (
                    <>
                      <button
                        className="mr-1"
                        onClick={() => handleSaveEditMember(member.id, member)}
                      >
                        Save
                      </button>
                      <button className="ml-1" onClick={handleCancelEditMember}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditMember(member.id)}>
                      Edit
                    </button>
                  )}
                </td>
                <td className="m-2 flex justify-center rounded-md bg-red-500 p-1 text-xs transition-transform duration-100 hover:scale-105 hover:bg-red-700">
                  <button onClick={() => handleDeleteMember(member.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
