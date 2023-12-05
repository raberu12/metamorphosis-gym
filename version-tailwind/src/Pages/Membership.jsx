import React, { useState } from 'react'

import { useUserContext } from '../Components/UserContext'

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { userData } = useUserContext()
  var userIdFromApi = 0

  const plans = [
    {
      name: 'BASIC',
      price: 1500,
      features: [
        'Unlimited access to the gym during REGULAR HOURS',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
        'Acces to INITIAL BRANCH ONLY',
      ],
    },
    {
      name: 'PRIME',
      price: 3000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Acces to any branch worldwide',
        'Participate in various group fitness classes',
      ],
    },
    {
      name: 'ELITE',
      price: 5000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
        'Acces to any branch worldwide',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
        'Personalized one-on-one consultation with a coach',
        'Access to premium and specialized gym equipment',
        'Access to the pool and all courts',
        'Access to personalized workout plans designed for your fitness goals',
      ],
    },
  ]

  const handleSubscribe = async (plan) => {
    try {
      console.log('userData: ', userData)
      const userId = userData.id // Access userId from the userData in context

      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          membership: plan.name, // Assuming 'name' field represents the plan name
        }),
        credentials: 'include', // Include credentials for cross-origin requests if needed
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Subscription updated successfully:', data.message)
        setSelectedPlan(plan) // Update the selected plan in the component state
      } else {
        console.error('Subscription failed:', data.message)
        // Handle subscription failure
      }
    } catch (error) {
      console.error('Subscription error:', error.message)
      // Handle subscription error
    }
  }

  const PlanModal = ({ selectedPlan, onClose, onConfirm }) => {
    const handleConfirmAndClose = async () => {
      await onConfirm() // Call the onConfirm function to handle subscription confirmation
      onClose() // Close the modal
    }
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="z-20 bg-white p-8">
          <h2 className="mb-4 text-2xl font-bold">
            Selected Plan: {selectedPlan.name}
          </h2>
          <ul>
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="mb-2">
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Confirm Subscription
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleCloseModal = () => {
    setSelectedPlan(null)
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-3 ml-8 text-7xl font-extrabold text-dark-elixir">
        MEMBERSHIP PLANS
      </h1>
      <div className="ml-44 mt-28 flex flex-row justify-center">
        {plans.map((plan) => (
          <div key={plan.name} className="m-2 w-1/3">
            <div
              className={`flex h-full flex-col justify-between rounded-lg ${
                plan.name === 'BASIC'
                  ? 'bg-gradient-to-b from-red-700 to-red-300'
                  : plan.name === 'PRIME'
                  ? 'bg-gradient-to-b from-indigo-700 to-indigo-300'
                  : 'bg-gradient-to-b from-purple-700 to-purple-300'
              } p-4 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105`}
            >
              <div>
                <h2 className="text-center text-6xl font-bold">{plan.name}</h2>
                <p className="mb-4 mt-4 text-center text-xl font-bold">
                  ₱{plan.price}/MONTH
                </p>
                <ul className="list-inside list-none">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="mb-3 flex items-center font-semibold"
                    >
                      <svg
                        className="mr-2 h-5 w-5 rounded-full bg-green-800 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSubscribe(plan)}
                className={`mt-4 self-center rounded ${
                  plan.name === 'BASIC'
                    ? 'bg-bronze'
                    : plan.name === 'PRIME'
                    ? 'bg-silver'
                    : 'bg-gold'
                } bg-white px-4 py-2 text-black`}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PlanModal selectedPlan={selectedPlan} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default MembershipPlans
