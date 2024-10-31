import React, { useState, useCallback } from 'react';
import Toast from './Toast.jsx';

function App() {
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [password, setPassword] = useState('');


  const [showToast, setShowToast] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(result);
  }, [length, includeNumbers, includeSpecial]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // alert('Password copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center text-white">
        <h1 className="text-4xl font-bold mb-6 text-green-400">Password Generator</h1>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Password Length:</label>
          <input
            type="number"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center justify-between text-lg font-medium">
            Include Numbers
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-5 w-5 accent-green-500"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="flex items-center justify-between text-lg font-medium">
            Include Special Characters
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={() => setIncludeSpecial(!includeSpecial)}
              className="h-5 w-5 accent-green-500"
            />
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full px-6 py-3 mb-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
        >
          Generate Password
        </button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-900 rounded-md text-green-300 font-mono text-lg"
          />
          {password && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {showToast && (
        <Toast message="Password copied to clipboard!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default App;
