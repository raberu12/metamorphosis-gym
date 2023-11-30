import React from 'react';

const HeaderImageWithDescription = ({ imageUrl, description }) => {
  return (
    
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex items-center justify-center bg-dark-elixir text-white p-4 rounded-lg" style={{ width: '90%' }}>
        <div className="w-full flex items-center justify-center">
          <div className="text-right text-5xl font-bold mr-4" dangerouslySetInnerHTML={{ __html: description }}></div>
          <div className="image-container rounded-lg" style={{ height: '540px', width: '900px', marginTop: '-16px', marginRight: '-170px', marginBottom: '-16px' }}>
            <img
              src={imageUrl}
              alt="Header Image"
              className="w-full h-full object-cover"
              style={{ width: '100%' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};



const ImageWithDescription = ({ imageUrl, description }) => {
  const [caption1, caption2] = description.split('<br />');

  return (
    <div className="flex flex-col items-center justify-center mb-4 w-full md:w-96 h-96 bg-dark-elixir text-white p-4 rounded-lg relative overflow-hidden" style={{ width: '90%', height:'550px' }}>
      <div className="image-container rounded-lg" style={{ height: '340px', width: '840px', marginTop: '-125px', marginBottom: '35px' }}>
        <img
          src={imageUrl}
          alt="Blog Image"
          className="w-full h-full object-cover rounded-lg"
          style={{ width: '100%' }}
        />
      </div>
      <div className="text-center mt-4">
        <p className="text-white text-3xl font-bold">{caption1}</p>
        <p className="text-white text-3xl font-bold">{caption2}</p>
      </div>
    </div>
  );
};



const Blog = () => {
  const headerContent = {
    image: './images/workingout.jpg',
    caption: '5 BENEFITS WHY WORKING<br />OUT WILL ENHANCE YOUR<br />MENTAL HEALTH',
  };
  const blogs = [
    {
      id: 1,
      image: './images/beats-while-working-out.png',
      caption: 'BEATS AND GAINS: THE IMPACE OF MUSIC ON YOUR<br />WORKOUT PERFORMANCE',
      
    },
    {
      id: 2,
      image: './images/lift.jpg',
      caption: 'BREAKING BARRIERS: A GUIDE TO PROGRESSIVE<br />OVERLOAD IN STRENGTH TRAINING',
    },
    {
      id: 3,
      image: './images/consultation.jpg',
      caption: 'WHY A FITNESS CONSULTATION IS VITAL: DISCOVER<br />THE KEY TO OPTIMIZING YOUR BODY\u0027S HEALTH',
    },
    {
      id: 4,
      image: './images/meal-prep.png',
      caption: 'HOW LONG SHOULD YOU WAIT TO WORKOUT<br />AFTER EATING?',
    },
    {
      id: 5,
      image: './images/protein.jpg',
      caption: 'HOW TO OPTIMIZE YOUR PROTEIN INTAKE FOR<br />WEIGHT LOSS WORKOUTS',
    },
    {
      id: 6,
      image: './images/landing img.jpg',
      caption: 'ACHIEVING WEIGHT LOSS: THE ULTIMATE GUIDE',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold my-8 pr-20 text-dark-elixir">Blog</h1>
      <HeaderImageWithDescription imageUrl={headerContent.image} description={headerContent.caption} />
      <div className="grid grid-cols-2 gap-4 justify-center">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 flex items-center justify-center rounded-lg hover:scale-105 transition-transform cursor-pointer">
            <ImageWithDescription imageUrl={blog.image} description={blog.caption} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
