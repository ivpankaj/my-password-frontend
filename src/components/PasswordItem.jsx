import React from "react";

const PasswordItem = ({
  pwd,
  handleDeletePassword,
  handleUpdatePassword,
  updatePassword,
  setUpdatePassword,
  updateVariable,
  setUpdateVariable,
}) => {
  return (
    <li className="bg-gradient-to-r from-green-100 to-blue-100 p-4 border border-green-300 rounded-lg shadow-sm hover:shadow-xl transform transition-all hover:scale-105">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg text-green-800">{pwd.variable}</p>
          <p className="text-gray-700">{pwd.password}</p>
        </div>
      </div>
      <div className="space-x-2 mt-2">
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this password?")
            ) {
              handleDeletePassword(pwd._id);
            }
          }}
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
  );
};

export default PasswordItem;
