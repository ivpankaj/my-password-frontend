import React from 'react';
import PasswordItem from './PasswordItem';


const PasswordList = ({ passwords, handleDeletePassword, handleUpdatePassword, updatePassword, setUpdatePassword, updateVariable, setUpdateVariable }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
      <h3 className="text-2xl font-medium text-purple-700 mb-4">Stored Passwords</h3>
      <ul className="space-y-4">
        {passwords.map((pwd) => (
          <PasswordItem
            key={pwd._id}
            pwd={pwd}
            handleDeletePassword={handleDeletePassword}
            handleUpdatePassword={handleUpdatePassword}
            updatePassword={updatePassword}
            setUpdatePassword={setUpdatePassword}
            updateVariable={updateVariable}
            setUpdateVariable={setUpdateVariable}
          />
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
