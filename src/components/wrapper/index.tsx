import React from 'react'
import DraggableComponent from '../labels';

export default function Wrapper() {
  return (
    <div className="w-2/3 h-[450px] bg-white rounded shadow-md p-5">
      <DraggableComponent />
    </div>
  );
}
