import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); 

function Consultation() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [fullNameError, setFullNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    
  
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/consultation-user-id", {
          method: "GET",
          headers: {
            "Authorization": token, 
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const fetchedUserId = data.user_id;
          setUserId(fetchedUserId);
        } else {
          console.error("Error fetching user ID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUserId();
  }, [token]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset errors when the user types
    if (name === "email") {
      setEmailError(null);
    } else if (name === "phone_number") {
      setPhoneError(null);
    } else if (name === "full_name") {
      setFullNameError(null);
    } else if (name === "date") {
      setDateError(null);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Allow numbers, plus sign, parentheses, and hyphen
    const phoneRegex = /^[\d+()\- ]+$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate full name
    if (!formData.full_name.trim()) {
      setFullNameError("Please enter your full name");
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (!validatePhoneNumber(formData.phone_number)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    // Validate date
    if (!formData.date) {
      setDateError("Please select a date");
      return;
    }

    // Check if user_id is available
    if (!user_id) {
      console.error("User ID not available");
      return;
    }

    const formDataWithUserId = {
      ...formData,
      user_id: user_id,
    };
    
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(formDataWithUserId),
      });
  
      if (response.ok) {
        console.log("Consultation submitted successfully!");
        setIsModalOpen(true);
        setFormData({
          full_name: "",
          email: "",
          phone_number: "",
          date: "",
        });
      } else {
        console.error("Error submitting consultation");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <h1 className='ml-56 mb-8 text-7xl font-extrabold text-dark-elixir'>BOOK A CONSULTATION</h1>
      <form 
        className='flex flex-col items-center ml-24 mt-16 h-full mb-80'
        onSubmit={handleSubmit}
        >
        <div className='bg-black text-white w-2/5 h- mr-16 rounded-lg'>
          <h2 className='text-center font-bold text-5xl my-10'>CONSULTATION FORM</h2>
          <div className='flex flex-wrap justify-between px-8 mr-6 mt-4 '>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Full Name</h3>
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-64 h-8 text-black rounded-sm p-2 ${
                    fullNameError ? "border-red-500" : ""
                  }`}
                />
                {fullNameError && (
                  <p className="text-red-500 text-sm">{fullNameError}</p>
                )}
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Email Address</h3>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-64 h-8 text-black rounded-sm p-2 ${
                    emailError ? "border-red-500" : ""
                  }`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Phone Number</h3>
                <input
                   type="number" 
                   name="phone_number"
                   value={formData.phone_number}
                   onChange={handleInputChange}
                   className={`w-64 h-8 text-black rounded-sm p-2 ${
                    phoneError ? "border-red-500" : ""
                  }`}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}
              </label>
            </div>
            <div className='mb-4'>
              <label>
                <h3 className='text-xl'>Select a Date</h3>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-64 h-8 text-black rounded-sm p-2 ${
                    dateError ? "border-red-500" : ""
                  }`}
                />
                {dateError && (
                  <p className="text-red-500 text-sm">{dateError}</p>
                )}
              </label>
            </div>
          </div>
          <div className='text-center mt-4 mb-4'>
              <button 
                  type="submit" 
                  className=' text-white bg-orangish w-32 h-12 rounded-xl items
                  cursor-pointer text-lg hover:bg-orange-800 transition-transform transform hover:scale-110 transition-duration-300'>
                  Submit
              </button>
          </div>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Consultation Success Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "300px",
            height: "130px",
            margin: "auto",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <div>
          <h2>Consultation Submitted Successfully!</h2>
          <button onClick={closeModal} className="bg-red-200 w-20 rounded-xl mt-2">Close</button>
        </div>
      </Modal>
    </>
  );
}

export default Consultation;