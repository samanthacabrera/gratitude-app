import React from 'react';

const Counter = ({ count }) => {
  return (
    <div className="fixed top-0 left-0 p-2">
      <p className="text-4xl text-slate-200 opacity-50">{count}</p>
    </div>
  );
};

export default Counter;
