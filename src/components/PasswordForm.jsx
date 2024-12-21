import React, { useState } from 'react';

const PasswordForm = ({ variable, password, setVariable, setPassword, handleAddPassword, error, success }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
      <h3 className="text-2xl font-medium text-purple-700 mb-4">Add a New Password</h3>
      {error && <div className="bg-red-500 text-white p-3 rounded-lg text-center">{error}</div>}
      {success && <div className="bg-green-500 text-white p-3 rounded-lg text-center">{success}</div>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Variable (e.g., email)"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-purple-500 hover:text-purple-700 focus:outline-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          onClick={handleAddPassword}
          className="w-full bg-black text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Password
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
