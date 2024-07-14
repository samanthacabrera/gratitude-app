import React, { useState, useEffect } from 'react';
import GratitudeList from './GratitudeList';
import AddGratitude from './AddGratitude';
import './App.css';

function App() {
  const [gratitudes, setGratitudes] = useState([]);

  useEffect(() => {
    fetchGratitudes();
  }, []);

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

  const handleAddGratitude = async (newGratitude) => {
    setGratitudes([newGratitude, ...gratitudes]); // Add new gratitude to state immediately

    try {
      const response = await fetch('api/gratitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGratitude),
      });
      if (!response.ok) {
        throw new Error('Failed to add gratitude');
      }
    } catch (error) {
      console.error('Error adding gratitude:', error);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <h1 id="title" className="text-7xl text-center m-8 hover:text-slate-200 transition ease-in-out duration-500">
        Gratitude <br/>Globe
      </h1>
      <div className="flex flex-col items-center justify-center">
        <GratitudeList gratitudes={gratitudes} />
        <AddGratitude onAddGratitude={handleAddGratitude} />
      </div>

      <div className="absolute bottom-2 right-2 border border-black py-2 px-4 rounded-full hover:text-slate-200 hover:border-slate-200 transition">
        <a href="https://github.com/samanthacabrera/gratitude-app" target="_blank" rel="noopener noreferrer">
          ?
        </a>
      </div>
    </div>
  );
}

export default App;
