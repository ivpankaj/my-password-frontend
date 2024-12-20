import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [variable, setVariable] = useState('');
  const [password, setPassword] = useState('');
  const [updateVariable, setUpdateVariable] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch stored passwords
  useEffect(() => {
    axios.get('http://localhost:5000/api/passwords')
      .then(res => setPasswords(res.data))
      .catch(err => console.log(err));
  }, []);  // Make sure we are only fetching once, on component mount

  const handleAddPassword = () => {
    if (!variable || !password) {
      setError("Please fill out both fields.");
      return;
    }
    axios.post('http://localhost:5000/api/passwords/add', { variable, password })
      .then(() => {
        setVariable('');
        setPassword('');
        setSuccess("Password added successfully.");
        setError('');
      })
      .catch(err => {
        setError("Error adding password.");
        setSuccess('');
      });
  };

  const handleUpdatePassword = (id) => {
    if (!updatePassword) {
      setError("Please enter a new password.");
      return;
    }
    axios.put(`http://localhost:5000/api/passwords/update/${id}`, { password: updatePassword })
      .then(() => {
        // Directly update the password list in state after update
        setPasswords(prevPasswords => 
          prevPasswords.map(pwd =>
            pwd._id === id ? { ...pwd, password: updatePassword } : pwd
          )
        );

        setUpdateVariable('');
        setUpdatePassword('');
        setSuccess("Password updated successfully.");
        setError('');
      })
      .catch(err => {
        setError("Error updating password.");
        setSuccess('');
      });
  };

  const handleDeletePassword = (id) => {
    axios.delete(`http://localhost:5000/api/passwords/delete/${id}`)
      .then(() => {
        setPasswords(prevPasswords => prevPasswords.filter(pwd => pwd._id !== id));
        setVariable('');
        setPassword('');
        setSuccess("Password deleted successfully.");
        setError('');
      })
      .catch(err => {
        setError("Error deleting password.");
        setSuccess('');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg mt-6 space-y-8">
      <h2 className="text-3xl font-semibold text-center text-white shadow-lg p-4 rounded-md bg-opacity-60">Password Manager</h2>

      {/* Error/Success Message */}
      {error && <div className="bg-red-500 text-white p-3 rounded-lg text-center">{error}</div>}
      {success && <div className="bg-green-500 text-white p-3 rounded-lg text-center">{success}</div>}

      {/* Add Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-medium text-purple-700 mb-4">Add a New Password</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Variable (e.g., email)"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
          <button
            onClick={handleAddPassword}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Password
          </button>
        </div>
      </div>

      {/* Stored Passwords Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-medium text-purple-700 mb-4">Stored Passwords</h3>
        <ul className="space-y-4">
          {passwords.map((pwd) => (
            <li key={pwd._id} className="bg-gradient-to-r from-green-100 to-blue-100 p-4 border border-green-300 rounded-lg shadow-sm hover:shadow-xl transform transition-all hover:scale-105">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-green-800">{pwd.variable}</p>
                  <p className="text-gray-700">{pwd.password}</p> {/* Display the plain-text password */}
                </div>
               
              </div>
              <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleDeletePassword(pwd._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setUpdateVariable(pwd.variable)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Update
                  </button>
                </div>

              {/* Update Password Form */}
              {updateVariable === pwd.variable && (
                <div className="mt-4 space-y-4">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={updatePassword}
                    onChange={(e) => setUpdatePassword(e.target.value)}
                    className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  />
                  <button
                    onClick={() => handleUpdatePassword(pwd._id)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-lg hover:from-orange-400 hover:to-yellow-400 transition duration-300 transform hover:scale-105"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordManager;
