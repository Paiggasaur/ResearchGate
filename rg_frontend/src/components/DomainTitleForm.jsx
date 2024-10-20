import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DomainTitleForm = () => {
  const [domain, setDomain] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Assuming username is part of the response
        } else {
          console.error('Failed to fetch profile:', await response.text());
          alert('Failed to fetch profile. Please log in again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching profile data. Please log in again.');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('No access token found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/send-email/', { // Corrected URL
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,  // Send the username
          email,     // Include the email address from the form
          domain,    // Domain input from the form
          title,     // Title input from the form
        }),
      });

      if (response.ok) {
        alert('Request sent successfully!'); // Notify the user
        setDomain(''); // Clear the input fields
        setTitle('');
        setEmail('');
      } else {
        const errorData = await response.json();
        console.error('Failed to send email:', errorData);
        alert(`Failed to send request: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        backgroundColor: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        padding: '40px 30px',
        width: '300px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#2b7a78' }}>Enter Domain, Title, and Email</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="domain" style={{ display: 'block', marginBottom: '8px' }}>
            Domain:
          </label>
          <input
            type="text"
            id="domain"
            placeholder="Enter Domain"
            value={domain}
            onChange={handleDomainChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
            }}
          />

          <label htmlFor="title" style={{ display: 'block', marginBottom: '8px' }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={handleTitleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
            }}
          />

          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DomainTitleForm;
