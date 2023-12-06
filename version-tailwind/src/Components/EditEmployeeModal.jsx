import React from 'react'
import { useState } from 'react'

const EditEmployeeModal = ({ onCancel, editingEmployee, handleSave }) => {
  // State for editing
  const [editedLastName, setEditedLastName] = useState(editingEmployee.lastname)
  const [editedFirstName, setEditedFirstName] = useState(
    editingEmployee.firstname,
  )
  const [editedWorkSchedule, setEditedWorkSchedule] = useState(
    editingEmployee.work_schedule,
  )

  const handleSaveInternal = () => {
    handleSave({
      id: editingEmployee.employee_id,
      newLastName: editedLastName,
      newFirstName: editedFirstName,
      newWorkSchedule: editedWorkSchedule,
    })
    saveChanges()
  }

  const saveChanges = () => {
    onCancel()
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>{' '}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form className="p-6">
            <label className="mb-2 block">Last Name:</label>
            <input
              type="text"
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
              className="w-full rounded-md border p-2"
            />

            <label className="mb-2 block">First Name:</label>
            <input
              type="text"
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
              className="w-full rounded-md border p-2"
            />

            <label className="mb-2 block">Work Schedule:</label>
            <select
              value={editedWorkSchedule}
              onChange={(e) => setEditedWorkSchedule(e.target.value)}
              className="w-full rounded-md border p-2"
            >
              <option value="Morning Shift">Morning Shift</option>
              <option value="Night Shift">Night Shift</option>
              <option value="On Leave">On Leave</option>
              <option value="No Work Schedule Set">No Work Schedule Set</option>
            </select>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveInternal}
                className="focus:shadow-outline-blue mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="focus:shadow-outline-gray rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:outline-none active:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEmployeeModal
