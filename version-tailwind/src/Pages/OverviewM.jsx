import React, { useState } from 'react';

function OverviewM() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);  
  const [exerciseStatus, setExerciseStatus] = useState({});


  const statusOptions = [
    { value: 'default', label: '', color: '#808080'},
    { value: 'completed', label: 'Completed', color: '#C84630' },
    { value: 'inProgress', label: 'In Progress', color: '#A4AF69' },
    { value: 'notStarted', label: 'Not Started', color: '#595358' },
  ];
 

  const handleStatusChange = (exerciseIndex, selectedValue) => {
    setExerciseStatus((prevStatus) => ({
      ...prevStatus,
      [exerciseIndex]: statusOptions.find((option) => option.value === selectedValue),
    }));
  };


  const workoutOptions = [
    {
      category: 'Strength ',
      exercises: [
        { name: 'Squats', sets: 4, reps: 8, weight: 'Barbell'},
        { name: 'Deadlifts', sets: 3, reps: 10, weight: 'Barbell'},
        { name: 'Bench Press', sets: 3, reps: 10, weight: 'Dumbbells'},
        { name: 'Overhead Press', sets: 4, reps: 8, weight: 'Barbell'},
        { name: 'Barbell Rows', sets: 3, reps: 12, weight: 'Barbell'}
      ]
    },
    {
      category: 'Cardio',
      exercises: [
        { name: 'Running', sets: 5, reps: '20 minutes', weight: 'Moderate'},
        { name: 'Cycling', sets: 2, reps: '15 minutes', weight: 'High'},
        { name: 'Rowing', sets: 3, reps: '10 minutes', weight: 'Moderate'},
        { name: 'Jump Rope', sets: 4, reps: '5 minutes', weight: 'High'},
        { name: 'Stair Climbing', sets: 4, reps: '15 minutes', weight: 'Moderate'}
      ]
    },
    {
      category: 'Flexibility',
      exercises: [
        { name: 'Yoga', sets: '', reps: '30 minutes', weight: 'none'},
        { name: 'Static Stretching', sets: '', reps: '15 minutes', weight: 'none'},
        { name: 'Dynamic Stretching', sets: '', reps: '10 minutes', weight: 'none'},
        { name: 'Pilates', sets: '', reps: '20 minutes', weight: 'none'},
        { name: 'Foam Rolling', sets: '', reps: '15 minutes', weight: 'none'}
      ]
    },
    {
      category: 'Functional',
      exercises: [
        { name: 'Kettlebell Swings', sets: 3, reps: 15, weight: 'Kettlebell'},
        { name: 'Medicine Ball Slams', sets: 3, reps: 12, weight: 'Medicine Ball'},
        { name: 'Battle Ropes', sets: 4, reps: '30 seconds', weight: 'none'},
        { name: 'TRX Suspension Training', sets: 3, reps: 12, weight: 'none'},
        { name: 'Box Jumps', sets: 3, reps: 10, weight: 'none'}
      ]
    },
    {
      category: 'Elevate',
      exercises: [
        { name: 'Burpees', sets: 4, reps: 15, weight: 'none'},
        { name: 'Sprints', sets: 6, reps: '100 meters', weight: 'none'},
        { name: 'Mountain Climbers', sets: 3, reps: 20, weight: 'none'},
        { name: 'High Knees', sets: 4, reps: 30, weight: 'none'},
        { name: 'Jumping Lunges', sets: 3, reps: 12, weight: 'none'}
      ]
    }
  ];

  const handleWorkoutChange = (e) => {
    const selectedValue = e.target.value;
    const selectedWorkoutOption = workoutOptions.find((option) => option.category === selectedValue);
    setSelectedWorkout(selectedWorkoutOption);
    setExerciseStatus({}); 
  };
  
  
  return (
    <div className='flex justify-center items-center h-auto pt-16 drop-shadow-2xl'>
      <div className='bg-dark-elixir w-4/6 h-5/6 rounded-md text-white'>
        <div>
          <h1 className='text-left text-6xl font-extrabold m-4'> My task </h1>
          <select 
            className='bg-orangish w-auto h-8 rounded-md mb-16 ml-4'
            onChange={handleWorkoutChange}
          > 
              <option>Select a workout</option>
              {workoutOptions.map((option) => (
                <option key={option.category} value={option.category}>
                  {option.category}
                </option>
              ))}
          </select>
        </div>
        <table className='w-full'>
          <tr className='text-2xl font-bold bg-thead rounded-md h-16'>
            <th className='px-16'>Name</th>
            <th className='px-16'>Set</th>
            <th className='px-16'>Reps</th>
            <th className='px-16'>Weight/Intensity</th>
            <th className='px-16'>Status</th>
          </tr>
          <tbody className='text-xl text-center align-middle'>
            {selectedWorkout &&
              selectedWorkout.exercises.map((exercise, index) => (
                <tr>
                    <td className='pt-10'>{exercise.name}</td>
                    <td className='pt-10'>{exercise.sets}</td>
                    <td className='pt-10'>{exercise.reps}</td>
                    <td className='pt-10'>{exercise.weight}</td>
                    <td className='pt-10'>
                    <select
                      className='w-30 p-1 text-sm rounded-md'
                      value={exerciseStatus[index]?.value || 'default'}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      style={{ 
                        backgroundColor:exerciseStatus[index]?.color || statusOptions[0].color,
                        color: 'white',
                      }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
      </div>
    </div>
  );
}

export default OverviewM;
