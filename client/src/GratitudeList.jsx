import React, { useEffect, useState } from 'react';

const GratitudeList = ({ gratitudes }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [shuffledGratitudes, setShuffledGratitudes] = useState([]);

  useEffect(() => {
    if (gratitudes.length > 1) {
      const randomGratitudes = [...gratitudes.slice(1)];
      for (let i = randomGratitudes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomGratitudes[i], randomGratitudes[j]] = [randomGratitudes[j], randomGratitudes[i]];
      }
      setShuffledGratitudes([gratitudes[0], ...randomGratitudes]);
    } else {
      setShuffledGratitudes(gratitudes);
    }
  }, [gratitudes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex =>
        prevIndex === shuffledGratitudes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [shuffledGratitudes]);

  return (
    <div className="gratitude-list">
      {shuffledGratitudes.map((gratitude, index) => (
        <div
          key={index}
          className={`gratitude-item p-4 my-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            index === currentMessageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: index === currentMessageIndex ? 1 : 0,
          }}
        >
          <p>{gratitude.message} <span className="font-light italic">- {gratitude.name} from {gratitude.location}</span></p>
        </div>
      ))}
    </div>
  );
};

export default GratitudeList;
