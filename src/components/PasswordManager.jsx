import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PasswordForm from './PasswordForm';
import PasswordList from './PasswordList';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [variable, setVariable] = useState('');
  const [password, setPassword] = useState('');
  const [updateVariable, setUpdateVariable] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('https://my-password-backend.onrender.com/api/passwords')
      .then(res => setPasswords(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddPassword = () => {
    if (!variable || !password) {
      setError("Please fill out both fields.");
      return;
    }
    axios.post('https://my-password-backend.onrender.com/api/passwords/add', { variable, password })
      .then(() => {
        setVariable('');
        setPassword('');
        setSuccess("Password added successfully.");
        setError('');
      })
      .catch(() => {
        setError("Error adding password.");
        setSuccess('');
      });
  };

  const handleUpdatePassword = (id) => {
    if (!updatePassword) {
      setError("Please enter a new password.");
      return;
    }
    axios.put(`https://my-password-backend.onrender.com/api/passwords/update/${id}`, { password: updatePassword })
      .then(() => {
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
      .catch(() => {
        setError("Error updating password.");
        setSuccess('');
      });
  };

  const handleDeletePassword = (id) => {
    axios.delete(`https://my-password-backend.onrender.com/api/passwords/delete/${id}`)
      .then(() => {
        setPasswords(prevPasswords => prevPasswords.filter(pwd => pwd._id !== id));
        setSuccess("Password deleted successfully.");
        setError('');
      })
      .catch(() => {
        setError("Error deleting password.");
        setSuccess('');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-lg mt-6 space-y-8">
      <h2 className="text-3xl font-semibold text-center text-white shadow-lg p-4 rounded-md bg-opacity-60">Password Manager</h2>
      <PasswordForm
        variable={variable}
        password={password}
        setVariable={setVariable}
        setPassword={setPassword}
        handleAddPassword={handleAddPassword}
        error={error}
        success={success}
      />
      <PasswordList
        passwords={passwords}
        handleDeletePassword={handleDeletePassword}
        handleUpdatePassword={handleUpdatePassword}
        updatePassword={updatePassword}
        setUpdatePassword={setUpdatePassword}
        updateVariable={updateVariable}
        setUpdateVariable={setUpdateVariable}
      />
    </div>
  );
};

export default PasswordManager;
