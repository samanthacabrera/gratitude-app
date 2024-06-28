import React, { useState, useEffect } from 'react';
import './App.css';
import BackgroundIframe from './Background';

function App() {
 const [message, setMessage] = useState('');
  const [gratitudes, setGratitudes] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    fetchGratitudes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex =>
        prevIndex === gratitudes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [gratitudes]);

  const fetchGratitudes = async () => {
    try {
      const response = await fetch('api/gratitudes');
      if (!response.ok) {
        throw new Error('Failed to fetch gratitudes');
      }
      const data = await response.json();
      setGratitudes(data);
    } catch (error) {
      console.error('Error fetching gratitudes:', error);
    }
  };

  const handleAddGratitude = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('api/gratitudes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        if (!response.ok) {
          throw new Error('Failed to add gratitude');
        }
        setMessage('');
        fetchGratitudes();
      } catch (error) {
        console.error('Error adding gratitude:', error);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <BackgroundIframe/>

    <h1 className="text-2xl font-semibold m-2">Gratitude Globe</h1>

    <div className="flex flex-col items-center justify-center">
      <div className="gratitude-list">
        {gratitudes.map((msg, index) => (
          <div
            key={index}
            className={`gratitude-item p-4 m-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
              index === currentMessageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              zIndex: index === currentMessageIndex ? 1 : 0,
            }}
          >
            {msg}
          </div>
        ))}
      </div>

    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <input
        type="text"
        className="p-2 text-gray-900 border border-gray-300 rounded focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="I am grateful for..."
      />
      <button
        className="py-2 px-4 text-gray-900 bg-slate-300 rounded hover:bg-slate-400 focus:outline-none"
        onClick={handleAddGratitude}
      >
        Share Gratitude! 
      </button>
    </div>
    </div>
  </div>
  );
}

export default App;

