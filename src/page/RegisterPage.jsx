import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/user/register`, {
        username: userInput.username,
        password: userInput.password,
        email: userInput.email,
      });

      if (response.status === 200) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        setError(`Error when register: ${response.data.message}`);
      }
    } catch (err) {
      if (err.response) {
        setError(`Error when register: ${err.response.data.message}`);
      } else {
        setError("Error when register");
      }
    }
  };
  const handleBackToLogin = () => {
    navigate("/login");
  };


  return (
    <div>
    <button
      onClick={handleBackToLogin}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "10px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Back to Login
    </button>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userInput.username}
        onChange={handleChange}
        style={{margin:"10px"}}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userInput.password}
        onChange={handleChange}
        style={{margin:"10px"}}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userInput.email}
        onChange={handleChange}
        style={{margin:"10px"}}
      />
      <button type="submit" style={{ margin: "10px", width: "400px" }} >Register</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
};

export default RegisterPage;
