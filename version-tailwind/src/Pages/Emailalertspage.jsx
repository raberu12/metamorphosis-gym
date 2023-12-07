import React, { useState, useEffect } from 'react';

function EmailalertsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/consultation-progress');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const handleAction = async (action, id) => {
    try {
      // Make a request to the API to update consultation status
      const response = await fetch(`http://localhost:3001/api/update-consultation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
  
      if (response.ok) {
        // Update the local state if the API request is successful
        const newData = [...data];
        const consultationIndex = newData.findIndex(item => item.id === id);
  
        if (consultationIndex !== -1) {
          newData[consultationIndex].status = action;
          setData(newData);
        }

        // Check if the action is 'removed' and make another API call to delete the item from the database
        if (action === 'removed') {
          const deleteResponse = await fetch(`http://localhost:3001/api/delete-consultation/${id}`, {
            method: 'DELETE',
          });

          if (!deleteResponse.ok) {
            console.error('Failed to delete consultation:', deleteResponse.statusText);
          }
        }
      } else {
        console.error('Failed to update consultation status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating consultation status:', error);
    }
    
  };

  return (
    <div>
      <table className='border-collapse mt-28 mb-52 ml-96 border-2 border-black'>
        <thead>
          <tr className='bg-slate-500'>
            <th className='border-2 font-bold border-black p-4 w-44'>Full Name</th>
            <th className='border-2 font-bold border-black p-4 w-44'>Email</th>
            <th className='border-2 font-bold border-black p-4 w-44'>Phone Number</th>
            <th className='border-2 font-bold border-black p-4 w-44'>Date</th>
            <th className='border-2 font-bold border-black p-4 w-44'>Status</th>
            <th className='border-2 font-bold border-black p-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='border-2 p-1 text-center border-black'>{item.full_name}</td>
              <td className='border-2 p-1 text-center border-black'>{item.email}</td>
              <td className='border-2 p-1 text-center border-black'>{item.phone_number}</td>
              <td className='border-2 p-1 text-center border-black'>{item.date}</td>
              <td className='border-2 p-1 text-center border-black'>{item.status}</td>
              <td className='border border-black flex flex-col items-center p-1'>
                <button className='text-center text-sm items-center font-semibold border border-black flex mb-1 rounded-md w-16 justify-center bg-green-500 transition duration-400 hover:scale-105 hover:bg-green-600' onClick={() => handleAction('approved', item.id)}>Approve</button>
                <button className='text-center text-sm items-center font-semibold border border-black flex mb-1 rounded-md w-16 justify-center bg-red-600 transition duration-400 hover:scale-105 hover:bg-red-700' onClick={() => handleAction('cancelled', item.id)}>Cancel</button>
                <button className='text-center text-sm items-center font-semibold border border-black flex mb-1 rounded-md w-16 justify-center bg-gray-400 transition duration-400 hover:scale-105 hover:bg-gray-500' onClick={() => handleAction('removed', item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailalertsPage;
