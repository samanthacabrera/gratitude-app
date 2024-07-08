import React, { useState } from 'react';

const AddGratitude = ({ onAddGratitude }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleAddGratitude = async () => {
    try {
      console.log("Submitting gratitude:", { name, location, message }); 

      const response = await fetch('api/gratitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to add gratitude');
      }

      console.log("Gratitude added successfully"); 
      fetchGratitudes(); 
    } catch (error) {
      console.error('Error adding gratitude:', error); 
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      {step === 1 && (
        <div>
          <input
            type="text"
            className="p-2 rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My name is .."
          />
          <button
            className="hover:text-white focus:outline-none m-4"
            onClick={handleNext}
          >
            &rarr;
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <button
            className="hover:text-white focus:outline-none m-4"
            onClick={handleBack}
          >
            &larr;
          </button>
          <input
            type="text"
            className="p-2 rounded focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="I am from .."
          />
          <button
            className="hover:text-white focus:outline-none m-4"
            onClick={handleNext}
          >
            &rarr;
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <button
            className="hover:text-white focus:outline-none m-4"
            onClick={handleBack}
          >
            &larr;
          </button>
          <input
            type="text"
            className="p-2 rounded focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I am grateful for .."
          />
          <button
            className="p-2 mx-4 text-xs rounded-full hover:text-white focus:outline-none"
            onClick={handleAddGratitude}
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default AddGratitude;
