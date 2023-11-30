import React from 'react';

const ImageWithDescription = ({ imageUrl, description, additionalDescription }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4 w-96 min-h-128 bg-dark-elixir text-white p-4 rounded-lg relative overflow-hidden">
      <div className="image-container rounded-lg" style={{ height: '500px', width:'390px', marginTop: '-16px'}}> 
        <img
          src={imageUrl}
          alt="Image"
          className="w-full h-full object-cover rounded-lg"
          style={{ width: '100%' }}
        />
      </div>
      <div className="text-center mt-4 h-40"> 
        <p className="text-white text-3xl font-bold">{description}</p>
        <p className="mt-2">{additionalDescription}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="bg-backgroundColor">
    <div className="container mx-auto py-8" >
      <h1 className="text-8xl font-bold mb-4 text-center text-dark-elixir">
        ELEVATE YOUR FITNESS<br />
        WITH<br />
        PROFESSIONAL GUIDANCE
      </h1>
      <br />
      <p className="text-xl mb-4 text-center text-black">
        Elevate your fitness with personalized expert guidance and achieve your goals confidently with tangible results.
      </p>
      <br /> <br />
      <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
        <ImageWithDescription
          imageUrl='./images/personalized-training_1.jpg'
          description="ONE-ON-ONE TRAINING"
          additionalDescription="Elevate your fitness with personalized expert guidance and achieve your goals confidently with tangible results."
        />
        <ImageWithDescription
          imageUrl='./images/gym2.png'
          description="24/7 ACCESS"
          additionalDescription="Experience unparalleled flexibility on your fitness journey with 24/7 access to personalized workouts. Exercise anytime and anywhere, at your own pace, and take your fitness experience to new heights."
        />
        <ImageWithDescription
          imageUrl='./images/consultation.jpg'
          description="FITNESS CONSULTATION"
          additionalDescription="Your coach will create a personalized fitness program based on a survey, conversation, and movement assessment to help you achieve your goals."
        />
      </div>
    </div>
    </div>
  );
};

export default Page;