import React from 'react'
import { useState } from 'react'

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('')

  const plans = [
    {
      name: 'NON-MEMBER',
      price: 1500,
      features: [
        'Unlimited access to the gym during REGULAR HOURS',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
      ],
    },
    {
      name: 'BASIC',
      price: 3000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
        'Access to locker room amenities',
        'Access to sauna room',
        'Participate in various group fitness classes',
      ],
    },
    {
      name: 'ELITE',
      price: 5000,
      features: [
        'Unlimited access to the gym 24/7',
        'Use of standard gym equipment',
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

  const handleSubscribe = (plan) => {
    console.log('Subscribe clicked:', plan)
    setSelectedPlan(plan)
  }

  const PlanModal = ({ selectedPlan, onClose }) => {
    console.log('Rendering PlanModal with:', selectedPlan)

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
          <button
            className="mt-4 self-center rounded bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    )
  }

  const handleCloseModal = () => {
    setSelectedPlan(null)
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-3 mt-10 text-7xl font-bold">MEMBERSHIP PLANS</h1>
      <div className="flex flex-row justify-between">
        {plans.map((plan) => (
          <div key={plan.name} className="m-2 w-1/3">
            <div className="flex h-full flex-col justify-between rounded-lg bg-orangish p-4 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
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
                className="mt-4 self-center rounded bg-dark-elixir px-4 py-2 text-white"
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
