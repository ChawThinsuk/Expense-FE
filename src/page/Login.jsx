import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;

function LoginPage () {
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(`${apiUrl}/auth/login`);
   
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username: userInput.username,
        password: userInput.password
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authDevice_id', response.data.device_id);
        console.log('Token:', response.data.token);
        console.log('Device_id:', response.data.device_id);
        if (response.status === 200) {
          navigate('/dashboard'); 
        }
      } else {
        setError(`Error when log in: ${response.data.message}`);
      }

    } catch (err) {
      if (err.response) {
        setError(`Error when log in: ${err.response.data.message}`);
      } else {
        setError("Error when log in");
      }
    }
  };
  const handleClick = () => {
    navigate('/register')
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Login Page</h1>
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
      <button type="submit" style={{ margin: "10px", width: "400px" }} >Login</button>
      {error && <p>{error}</p>}
    </form>
    <h3 style={{ textAlign: 'center' }} onClick={handleClick}>Register</h3>
    </div>

  );
}

export default LoginPage;
