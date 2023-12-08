import React from 'react'
import EditMemberModal from './EditMemberModal'
import { useState } from 'react'

const MembersList = ({ members }) => {
  const [editingMember, setEditingMember] = useState(null)
  const openEditModal = (member) => {
    setEditingMember(member)
  }

  const closeEditModal = () => {
    setEditingMember(null)
  }

  const handleSaveMember = (editedMember) => {
    fetch(`http://localhost:3001/edit/member/${editedMember.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newLastName: editedMember.newLastName,
        newFirstName: editedMember.newFirstName,
        newMembership: editedMember.newMembership,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data.message)
      })
      .catch((error) => console.error('Error updating member:', error))
  }

  const handleDeleteMember = (memberId) => {
    fetch(`http://localhost:3001/delete/member/${memberId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log(data.message)
      })
      .catch((error) => console.error('Error deleting member:', error))
  }

  return (
    <div>
      <h2 className="mb-2 mt-6 text-xl font-bold">Members List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Membership
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {members.map((member, index) => (
            <tr key={index} className="mb-2">
              <td className="whitespace-nowrap px-6 py-4">
                {member.lastname}, {member.firstname}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {member.membership}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  className="rounded bg-blue-400 p-2 text-white hover:text-blue-900"
                  onClick={() => openEditModal(member)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 rounded bg-red-600 p-2 text-white hover:text-red-900"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingMember && (
        <EditMemberModal
          onCancel={closeEditModal}
          editingMember={editingMember}
          handleSave={handleSaveMember}
        />
      )}
    </div>
  )
}

export default MembersList
