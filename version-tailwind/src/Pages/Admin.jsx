import React, { useState, useEffect } from 'react'
import EditEmployeeModal from '../Components/EditEmployeeModal'
import MembersList from '../Components/MembersList'
import EmailalertsPage from './Emailalertspage'

const Admin = () => {
  const [employees, setEmployees] = useState([])
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [members, setMembers] = useState([])

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
  }

  const handleCancelEditEmployee = () => {
    setEditingEmployee(null)
  }

  useEffect(() => {
    fetch('http://localhost:3001/get/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data)
      })
      .catch((error) => console.error('Error fetching employee data:', error))
  }, [employees])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:3001/get/users/user');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          console.error('Error fetching members:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [members]);

  const handleSaveEmployee = (updatedEmployee) => {
    fetch(`http://localhost:3001/edit/employee/${updatedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updatedEmployee.id, // Assuming employee ID is stored in 'id'
        newLastName: updatedEmployee.newLastName,
        newFirstName: updatedEmployee.newFirstName,
        newWorkSchedule: updatedEmployee.newWorkSchedule,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Employee updated successfully:', data)
      })
      .catch((error) => console.error('Error updating employee:', error))
  }

  const handleDeleteEmployee = (employeeId) => {
    // Make a DELETE request to your server endpoint
    fetch(`http://localhost:3001/delete/employee/${employeeId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)

        // Log the current state for debugging
        console.log('Current Employees State:', employees)

        // Remove the deleted employee from the local state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => {
            const isMatching = employee.employee_id === employeeId

            // Log the values for debugging
            console.log('Employee ID:', employee.employee_id)
            console.log('Is Matching?', isMatching)

            return !isMatching
          }),
        )
      })
      .catch((error) => console.error('Error deleting employee:', error))
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-3xl">Admin Dashboard</h1>
      <div>
        <h2 className="mb-2 text-xl font-bold">Employee List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Work Schedule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {employees.map((employee, index) => (
              <tr key={index} className="mb-2">
                <td className="whitespace-nowrap px-6 py-4">
                  {employee.lastname}, {employee.firstname}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {employee.work_schedule}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    className="rounded bg-blue-400 p-2 text-white hover:text-blue-900"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 rounded bg-red-600 p-2 text-white hover:text-red-900"
                    onClick={() => handleDeleteEmployee(employee.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MembersList
        members={members}
      />
      {editingEmployee && (
        <EditEmployeeModal
          onCancel={handleCancelEditEmployee}
          editingEmployee={editingEmployee}
          handleSave={handleSaveEmployee}
        />
      )}
      <h2 className="mt-6 text-xl font-bold">Consultation Approval</h2>
      <EmailalertsPage/>
    </div>
  )
}

export default Admin
