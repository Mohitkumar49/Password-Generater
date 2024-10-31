import React from 'react';

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg shadow-md text-sm">
      {message}
      <button onClick={onClose} className="ml-2 text-xs font-bold">✕</button>
    </div>
  );
}

export default Toast;
