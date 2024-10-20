// src/components/LoginPage.jsx

import React, { useState } from 'react';
import logo from './logo.png'; // Ensure logo.png is in the correct directory
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response is not OK and log the response
      if (!response.ok) {
        const errorData = await response.text(); // Get response as text
        console.error('Error response:', errorData); // Log full response for debugging
        setErrorMessage('Login failed. Please try again.');
        return; // Exit early
      }

      const data = await response.json(); // Only parse JSON if response is OK
      console.log('Login successful, received token:', data.access);
      localStorage.setItem('access_token', data.access); // Save the access token
      login(data.access); // Update auth context if necessary
      console.log('Navigating to profile'); // Debugging log
      navigate('/login/profile');
      console.log('sucessfully navigated');
       // Navigate to profile on successful login
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif', color: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
      <header style={{ position: 'absolute', top: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <nav style={{ height: '100px', backgroundColor: '#2b7a78', width: '100%', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ height: '70px', width: '70px', marginRight: '15px', borderRadius: '5px' }} />
              <h2 style={{ fontSize: '1.8em', color: 'white', margin: 0 }}>SIT ResearchGate</h2>
            </a>
          </div>
        </nav>
      </header>

      <section id="div2" style={{ backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '40px 30px', width: '300px', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5em', color: '#2b7a78', marginBottom: '20px' }}>Log into your Account.</h1>

        {errorMessage && <p style={{ color: 'red', fontSize: '0.9em' }}>{errorMessage}</p>}

        <form onSubmit={submitForm}>
          <label htmlFor="username" style={{ display: 'block', fontSize: '0.9em', textAlign: 'left', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px', color: '#333' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" style={{ display: 'block', fontSize: '0.9em', textAlign: 'left', marginBottom: '5px' }}>Enter Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter Password"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', color: '#333' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <input type="checkbox" id="showPassword" onClick={togglePassword} style={{ marginRight: '5px' }} />
            <label htmlFor="showPassword" style={{ fontSize: '0.9em', color: '#333' }}>Show Password</label>
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '10px', fontSize: '1em', color: 'white', backgroundColor: '#1e90ff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
