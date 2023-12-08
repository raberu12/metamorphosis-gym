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
    
    // Set up an interval to fetch data every 0.5 seconds (500 milliseconds)
  const intervalId = setInterval(fetchData, 500);

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
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
      <table className=' mt-28 mb-52 ml-96 text-gray-500'>
        <thead>
          <tr className='border-2'>
            <th className='border-2  p-4 w-44'>NAME</th>
            <th className='border-2  p-4 w-44'>EMAIL</th>
            <th className='border-2  p-4 w-44'>PHONE NUMBER</th>
            <th className='border-2  p-4 w-44'>DATE</th>
            <th className='border-2  p-4 w-44'>STATUS</th>
            <th className='border-2  p-4 w-44'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='text-black text-center'>
              <td className='border-2 p-1 '>{item.full_name}</td>
              <td className='border-2 p-4 '>{item.email}</td>
              <td className='border-2 p-1 '>{item.phone_number}</td>
              <td className='border-2 p-1 '>{item.date}</td>
              <td className='border-2 p-1 '>{item.status}</td>
              <td className='border flex flex-rowitems-center p-1 text-white'>
                <button className='text-center text-sm items-center font-semibold border flex my-2 ml-2 rounded w-16 justify-center p-2 bg-green-500 transition duration-400 hover:scale-105 hover:bg-green-600' onClick={() => handleAction('approved', item.id)}>Approve</button>
                <button className='text-center text-sm items-center font-semibold border flex my-2 ml-2 rounded w-16 justify-center p-2 bg-red-600 text-white hover:text-red-900 transition duration-400 hover:scale-105' onClick={() => handleAction('cancelled', item.id)}>Cancel</button>
                <button className='text-center text-sm items-center font-semibold border flex my-2 ml-2 rounded w-16 justify-center p-2 bg-gray-400 transition duration-400 hover:scale-105 hover:bg-gray-500' onClick={() => handleAction('removed', item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailalertsPage;
