import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000";

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/signup`, { email, password });
      setMessage(res.data.message);
      setEmail("");
      setPassword("");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>

        {message && <p className="mb-4 text-center text-sm">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter password"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-3 text-center">Saved Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u, i) => (
              <li
                key={i}
                className="bg-gray-50 p-2 rounded-lg border border-gray-200 text-sm"
              >
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
