import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Member.css'; // Import the CSS file
import Header from './Header'; // Import the Header component

const Member = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/members/'); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="members-container">
      <Header /> {/* Include the Header component here */}
      <h1>Members</h1>
      {members.length > 0 ? (
        <ul className="members-list">
          {members.map((member, index) => (
            <li key={index} className="member-item">
              <img
                src={member.photo}
                alt={member.name} // Updated alt attribute for accessibility
              />
              <div>
                <h2>{member.name}</h2>
                <p>{member.year} - {member.branch} - {member.department}</p>
                <p>Publications: {member.number_of_publications}</p>
                <Link to={`/submissions/${member.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <button className="member-button">View Submissions</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading-message">Loading members...</p>
      )}
    </div>
  );
};

export default Member;