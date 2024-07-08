import React, { useEffect, useState } from 'react';

const GratitudeList = ({ gratitudes }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex =>
        prevIndex === gratitudes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [gratitudes]);

  return (
    <div className="gratitude-list">
      {gratitudes.map((gratitude, index) => (
        <div
          key={index}
          className={`gratitude-item p-4 my-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            index === currentMessageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: index === currentMessageIndex ? 1 : 0,
          }}
        >
         
         
          <p>{gratitude.message} <span className="font-light italic" >- {gratitude.name} from {gratitude.location}</span></p>
           <p>  </p>
        </div>
      ))}
    </div>
  );
};

export default GratitudeList;
