import React, { useState } from 'react';

const EditMemberModal = ({ onCancel, editingMember, handleSave }) => {
  const [editedLastName, setEditedLastName] = useState(editingMember.lastname);
  const [editedFirstName, setEditedFirstName] = useState(editingMember.firstname);
  const [editedMembership, setEditedMembership] = useState(editingMember.membership);

  const handleSaveInternal = () => {
    handleSave({
      id: editingMember.id,
      newLastName: editedLastName,
      newFirstName: editedFirstName,
      newMembership: editedMembership,
    });
    saveChanges();
  };

  const saveChanges = () => {
    onCancel();
  };

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

            <label className="mb-2 block">Membership:</label>
            <select
              value={editedMembership}
              onChange={(e) => setEditedMembership(e.target.value)}
              className="w-full rounded-md border p-2"
            >
              <option value="unsubscribed">Unsubscribed</option>
              <option value="basic">Basic</option>
              <option value="prime">Prime</option>
              <option value="elite">Elite</option>
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
  );
};

export default EditMemberModal;
