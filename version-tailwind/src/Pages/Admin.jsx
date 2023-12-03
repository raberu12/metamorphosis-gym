import React, { useState, useEffect } from 'react';

function Admin() {
  const [employeeData, setEmployeeData] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    position: '',
    phoneNumber: '',
    workSchedule: '',
  });

  const [memberData, setMemberData] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({
    username: '',
    email: '',
    role: '',
    membership: '',
  });

  const [totalCurrentEmployees, setTotalCurrentEmployees] = useState(0);
  const [totalCurrentMembers, setTotalCurrentMembers] = useState(0);

  const setCurrentEmployees = (employees) => setTotalCurrentEmployees(employees);
  const setCurrentMembers = (members) => setTotalCurrentMembers(members);

  useEffect(() => {
    fetchEmployeeData();
    fetchCounts();
    fetchMemberData();
    fetchTotalCurrentMembers();

    const intervalId = setInterval(() => {
      fetchCounts();
      fetchTotalCurrentMembers();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchTotalCurrentMembers = () => {
    fetch('http://localhost:3001/api/totalCurrentMembers')
      .then(response => response.json())
      .then(data => {
        setCurrentMembers(data.totalCurrentMembers);
      })
      .catch(error => console.error('Error fetching total members:', error));
  };

  const fetchEmployeeData = () => {
    fetch('http://localhost:3001/api/employees')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error('Error fetching employee data:', error));
  };

  const fetchCounts = () => {
    fetch('http://localhost:3001/api/totalCurrentEmployees')
      .then(response => response.json())
      .then(data => {
        setCurrentEmployees(data.totalCurrentEmployees);
      })
      .catch(error => console.error('Error fetching total current employees:', error));
  };

  const handleEditEmployee = (id) => {
    setEditingEmployee(id);
  };

  const handleCancelEditEmployee = () => {
    setEditingEmployee(null);
  };

  const handleSaveEditEmployee = (id, editedEmployee) => {
    fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEmployee),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setEmployeeData(prevData =>
          prevData.map(employee =>
            employee.id === id ? editedEmployee : employee
          )
        );
        setEditingEmployee(null);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDeleteEmployee = (id) => {
    fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setEmployeeData(prevData => prevData.filter(employee => employee.id !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const handleEditFieldChangeEmployee = (id, field, value) => {
    setEmployeeData(prevData =>
      prevData.map(employee =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  const handleNewEmployeeChange = (field, value) => {
    setNewEmployee(prevData => ({ ...prevData, [field]: value }));
  };

  const handleAddNewEmployee = () => {
    fetch(`http://localhost:3001/api/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(newEmployeeFromServer => {
        setEmployeeData(prevData => [...prevData, newEmployeeFromServer]);
        setNewEmployee({
          fullName: '',
          position: '',
          phoneNumber: '',
          workSchedule: '',
        });
        setShowAddEmployeeForm(false);
      })
      .catch(error => {
        console.error('Error adding new employee:', error);
      });
  };

  const fetchMemberData = () => {
    fetch('http://localhost:3001/api/members')
      .then(response => response.json())
      .then(data => setMemberData(data))
      .catch(error => console.error('Error fetching member data:', error));
  };

  const handleEditMember = (id) => {
    setEditingMember(id);
  };

  const handleCancelEditMember = () => {
    setEditingMember(null);
  };

  const handleSaveEditMember = (id, editedMember) => {
    fetch(`http://localhost:3001/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMember),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setMemberData(prevData =>
          prevData.map(member =>
            member.id === id ? editedMember : member
          )
        );
        setEditingMember(null);
      })
      .catch(error => {
        console.error('Error updating member:', error);
      });
  };

  const handleDeleteMember = (id) => {
    fetch(`http://localhost:3001/api/members/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setMemberData(prevData => prevData.filter(member => member.id !== id));
      })
      .catch(error => {
        console.error('Error deleting member:', error);
      });
  };

  const handleEditFieldChangeMember = (id, field, value) => {
    setMemberData(prevData =>
      prevData.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleNewMemberChange = (field, value) => {
    setNewMember(prevData => ({ ...prevData, [field]: value }));
  };

  const handleAddNewMember = () => {
    fetch(`http://localhost:3001/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(newMemberFromServer => {
        setMemberData(prevData => [...prevData, newMemberFromServer]);
        setNewMember({
          username: '',
          email: '',
          role: '',
          membership: '',
        });
        setShowAddMemberForm(false);
      })
      .catch(error => {
        console.error('Error adding new member:', error);
      });
  };

  return (
    <div className='ml-80'>
      {/* Display Total Members */}
      <div className='flex justify-center text-center mr-72'>
        <div className='bg-white m-10 w-80 h-36 rounded-lg'>
          <div className='font-semibold text-xl mt-2'>Total Members</div>
          <div className='text-5xl p-5 font-extrabold text-sky-900'>{totalCurrentMembers} PEOPLE</div>
        </div>
        <div className='bg-white m-10 w-80 h-36 rounded-lg'>
          <div className='font-semibold text-xl mt-2'>Total Employees</div>
          <div className='text-5xl p-5 font-extrabold text-sky-900'>{totalCurrentEmployees} PEOPLE</div>
        </div>
      </div>
      
      {/* Employees Table */}
      <div className='flex'>
        <div className='font-medium text-2xl'>Employees</div>
        <button
          onClick={() => setShowAddEmployeeForm(!showAddEmployeeForm)}
          className='flex items-center text-white font-normal text-center rounded-md ml-10 p-1 bg-sky-900 h-10 transition-transform duration-300 hover:scale-105 hover:bg-sky-800'>+ Add New Employee</button>
      </div>

      {showAddEmployeeForm  && (
        <div className='mt-4'>
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Full Name"
            value={newEmployee.fullName}
            onChange={(e) => handleNewEmployeeChange('fullName', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => handleNewEmployeeChange('position', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Phone Number"
            value={newEmployee.phoneNumber}
            onChange={(e) => handleNewEmployeeChange('phoneNumber', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Work Schedule"
            value={newEmployee.workSchedule}
            onChange={(e) => handleNewEmployeeChange('workSchedule', e.target.value)}
          />
          <button className='text-white font-normal text-center rounded-md ml-10 p-1 bg-sky-900 h-8 transition-transform duration-300 hover:scale-105 hover:bg-sky-800' onClick={handleAddNewEmployee}>Add Employee</button>
        </div>
      )}

<div>
        <table className='bg-slate-50 mt-2 w-10/12'>
          <thead>
            <tr className='justify-center bg-gray-300 font-bold'>
              <th className='p-2'>FULL NAME</th>
              <th className='p-2'>POSITION</th>
              <th className='p-2'>PHONE NUMBER</th>
              <th className='p-2'>WORK SCHEDULE</th>
              <th className='p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id} className={employee.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='text-center p-6 rounded-md'>
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.fullName}
                      onChange={(e) => handleEditFieldChangeEmployee(employee.id, 'fullName', e.target.value)}
                    />
                  ) : (
                    employee.fullName
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.position}
                      onChange={(e) => handleEditFieldChangeEmployee(employee.id, 'position', e.target.value)}
                    />
                  ) : (
                    employee.position
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.phoneNumber}
                      onChange={(e) => handleEditFieldChangeEmployee(employee.id, 'phoneNumber', e.target.value)}
                    />
                  ) : (
                    employee.phoneNumber
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingEmployee === employee.id ? (
                    <input
                      type="text"
                      value={employee.workSchedule}
                      onChange={(e) => handleEditFieldChangeEmployee(employee.id, 'workSchedule', e.target.value)}
                    />
                  ) : (
                    employee.workSchedule
                  )}
                </td>
                <td className='bg-sky-400 transition-transform duration-100 hover:scale-105 hover:bg-sky-500 justify-center text-xs rounded-md p-1 m-2 flex'>
                  {editingEmployee === employee.id ? (
                    <>
                      <button className='mr-1' onClick={() => handleSaveEditEmployee(employee.id, employee)}>Save</button>                      
                      <button className='ml-1' onClick={handleCancelEditEmployee}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditEmployee(employee.id)}>Edit</button>
                  )}
                </td>
                <td className='bg-red-500 transition-transform duration-100 hover:scale-105 hover:bg-red-700 justify-center text-xs rounded-md p-1 m-2 flex'>
                  <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Members Table */}
      <div className='flex mt-8'>
        <div className='font-medium text-2xl'>Members</div>
        <button
          onClick={() => setShowAddMemberForm(!showAddMemberForm)}
          className='flex items-center text-white font-normal text-center rounded-md ml-10 p-1 bg-sky-900 h-10 transition-transform duration-300 hover:scale-105 hover:bg-sky-800'>+ Add New Members</button>
      </div>

      {showAddMemberForm  && (
        <div className='mt-4'>
          {/* Adjust input fields based on your member data structure */}
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Username"
            value={newMember.username}
            onChange={(e) => handleNewMemberChange('username', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => handleNewMemberChange('email', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => handleNewMemberChange('role', e.target.value)}
          />
          <input className='p-1 rounded-sm mr-5 text-center'
            type="text"
            placeholder="Membership"
            value={newMember.membership}
            onChange={(e) => handleNewMemberChange('membership', e.target.value)}
          />
          <button className='text-white font-normal text-center rounded-md ml-10 p-1 bg-sky-900 h-8 transition-transform duration-300 hover:scale-105 hover:bg-sky-800' onClick={handleAddNewMember}>Add Member</button>
        </div>
      )}

<div>
        <table className='bg-slate-50 mt-2 mb-16 w-10/12'>
          <thead>
            <tr className='justify-center bg-gray-300 font-bold'>
              <th className='p-2'>USERNAME</th>
              <th className='p-2'>EMAIL</th>
              <th className='p-2'>ROLE</th>
              <th className='p-2'>MEMBERSHIP</th>
              <th className='p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberData.map((member) => (
              <tr key={member.id} className={member.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='text-center p-6 rounded-md'>
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.username}
                      onChange={(e) => handleEditFieldChangeMember(member.id, 'username', e.target.value)}
                    />
                  ) : (
                    member.username
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.email}
                      onChange={(e) => handleEditFieldChangeMember(member.id, 'email', e.target.value)}
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleEditFieldChangeMember(member.id, 'role', e.target.value)}
                    />
                  ) : (
                    member.role
                  )}
                </td>
                <td className='text-center p-6 rounded-md'>
                  {editingMember === member.id ? (
                    <input
                      type="text"
                      value={member.membership}
                      onChange={(e) => handleEditFieldChangeMember(member.id, 'membership', e.target.value)}
                    />
                  ) : (
                    member.membership
                  )}
                </td>
                <td className='bg-sky-400 transition-transform duration-100 hover:scale-105 hover:bg-sky-500 justify-center text-xs rounded-md p-1 m-2 flex'>
                  {editingMember === member.id ? (
                    <>
                      <button className='mr-1' onClick={() => handleSaveEditMember(member.id, member)}>Save</button>
                      <button className='ml-1' onClick={handleCancelEditMember}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditMember(member.id)}>Edit</button>
                  )}
                </td>
                <td className='bg-red-500 transition-transform duration-100 hover:scale-105 hover:bg-red-700 justify-center text-xs rounded-md p-1 m-2 flex'>
                  <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
