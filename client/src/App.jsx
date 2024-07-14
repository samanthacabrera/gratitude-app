import React, { useState, useEffect } from 'react';
import GratitudeList from './GratitudeList';
import AddGratitude from './AddGratitude';
import Counter from './Counter';
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
      fetchGratitudes();
    } catch (error) {
      console.error('Error adding gratitude:', error);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative text-slate-50 opacity-50">
      <h1 id="title" className="text-7xl text-center m-8">
        Gratitude <br/>Globe
      </h1>
      <div className="flex flex-col items-center justify-center">
        <GratitudeList gratitudes={gratitudes} />
        <AddGratitude onAddGratitude={handleAddGratitude} />
      </div>

      <Counter count={gratitudes.length} />

      <div className="absolute bottom-2 right-2 border border-2 border-slate-50 opacity-100 py-2 px-4 text-xl rounded-full hover:text-slate-200 hover:border-slate-200 transition">
        <a href="https://github.com/samanthacabrera/gratitude-app" target="_blank" rel="noopener noreferrer">
          ?
        </a>
      </div>
    </div>
  );
}

export default App;
