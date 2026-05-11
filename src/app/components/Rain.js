import React from 'react';

export default function Rain({ drops }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {drops.map(drop => (
        <div key={drop.id} className="acid-drop" style={drop}></div>
      ))}
    </div>
  );
}