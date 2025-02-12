import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  // State to store email and password
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to sign in
      const response = await axios.post(
        "http://localhost:5173/api/auth/signin",
        credentials
      );
      // Store token in local storage
      localStorage.setItem("authToken", response.data.token);
      alert("Logged in successfully");
    } catch (error) {
      // Show error message
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl text-center font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border-gray-300 rounded-md"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full p-3 border-gray-300 rounded-md"
          value={credentials.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
