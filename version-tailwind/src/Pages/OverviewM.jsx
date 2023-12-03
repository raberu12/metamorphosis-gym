import React, { useState, useEffect } from 'react';

function OverviewM() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseStatus, setExerciseStatus] = useState({});
  const [categories, setCategories] = useState([]);
  const [workoutOptions, setWorkoutOptions] = useState([]);
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [statusOptions] = useState([
    { value: 'notStarted', label: 'Not Started', color: '#595358' },
    { value: 'inProgress', label: 'In Progress', color: '#A4AF69' },
    { value: 'completed', label: 'Completed', color: '#C84630' },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching workout categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Reset exerciseStatus when selectedCategory changes
    setExerciseStatus({});
  }, [selectedCategory]);


  const fetchExercises = async (category) => {
    try {
      const response = await fetch(`http://localhost:3001/exercises/${category}`);
      const data = await response.json();
      setWorkoutOptions(data.exercises);
      // Reset selected workout when fetching new exercises
      setSelectedWorkout(null);
    } catch (error) {
      console.error("Error fetching workout options:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    fetchExercises(selectedCategory);
  };

  const handleSelectedWorkout = (selectedValue, category) => {
    const selectedWorkout = workoutOptions.find(option => option.name === selectedValue);
    setSelectedWorkout(selectedWorkout);
    setSelectedCategoryImage(category);
  }

  const handleStatusChange = (index, value) => {
    setExerciseStatus({
      ...exerciseStatus,
      [index]: { value, color: statusOptions.find((status) => status.value === value)?.color },
    });
  };

  const workoutCategories = [
    { name: 'Endurance Training', img: './images/endurance.svg' },
    { name: 'Strength Training', img: './images/weightlifting.svg' },
    { name: 'Circuit Training', img: './images/jumping.svg' },
    { name: 'Flexibility Training', img: './images/stretching.svg' },
    { name: 'Elevate Training', img: './images/elevate.svg' }
  ];

  function WorkoutImage({ imagePath, altText, width = 48, height = 48 }) {
    const isSelectedCategory = altText === selectedCategory;
  
    return (  
      <div
        className={`mr-8 border border-solid border-black p-4  rounded-sm ${
          isSelectedCategory ? 'bg-chuy' : 'bg-slate-200'
        }`}
      >
        <img src={imagePath} alt={altText} className={`w-${width} h-${height}`} />
        <h2 className='text-center mt-2 text-black'>{altText}</h2>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-auto pt-16 drop-shadow-2xl mb-32'>
      <div className='bg-dark-elixir ml-40 w-5/6 h-5/6 rounded-md text-white'>
        <div>
          <h1 className='text-left text-6xl font-extrabold m-4'> My task </h1>
          <select
            className='bg-orangish w-auto h-8 rounded-md mb-16 ml-4 mt-2'
            onChange={handleCategoryChange}
          >
            <option>Select a category</option>
            {categories.length > 0 && categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-center items-center'>
          <button className='flex row-auto mb-16 '>
            {workoutCategories.map((category, index) => (
              <WorkoutImage
                key={index}
                imagePath={category.img}
                altText={category.name}
                onClick={() => handleSelectedWorkout(category.name)}
              />
            ))}
          </button>
        </div>
        <table className='w-full'>
          <tr className='text-2xl font-bold bg-thead rounded-md h-16'>
            <th className='px-16'>Name</th>
            <th className='px-16'>Set</th>
            <th className='px-16'>Reps</th>
            <th className='px-16'>Intensity</th>
            <th className='px-16'>Status</th>
          </tr>
          <tbody className='text-xl text-center align-middle'>
          {workoutOptions.map((exercise, index) => (
            <tr key={index}>
              <td className='pt-10'>{exercise.name}</td>
              <td className='pt-10'>{exercise.sets}</td>
              <td className='pt-10'>{exercise.reps}</td>
              <td className='pt-10'>{exercise.intensity}</td>
              <td className='pt-10'>
                <select
                  className='w-26 h-8 p-1 text-sm rounded-md'
                  value={exerciseStatus[index]?.value || 'default'}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  style={{
                    backgroundColor: exerciseStatus[index]?.color || statusOptions[0]?.color,
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
