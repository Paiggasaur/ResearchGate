import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './StudentCoordinator.css'; // Import the CSS file
import Header from './Header';

const StudentCoordinators = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetching Members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/coordinators/');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data); // Assuming your API returns the expected member objects
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Function to handle view submissions
  const viewSubmissions = (memberName) => {
    // Navigate to the submissions page with the member's name
    navigate(`/submissions/${memberName}`);
  };

  return (
    <div className="student-coordinators">
      <Header />
      <h1 className="coordinators-title">Student Coordinators</h1>
      {loading ? (
        <p className="loading">Loading student coordinators...</p>
      ) : (
        <div>
          {members.length > 0 ? (
            <ul className="coordinators-list">
              {members.map((member) => (
                <li className="coordinator-item" key={member.id}>
                  <h2>{member.name}</h2>
                  <p><strong>Year:</strong> {member.year}</p>
                  <p><strong>Branch:</strong> {member.branch}</p>
                  <p><strong>Department:</strong> {member.department}</p>
                  <p><strong>Publications:</strong> {member.number_of_publications}</p>
                  {member.photo && (
                    <img className="coordinator-photo" src={member.photo} alt={member.name} />
                  )}
                  <br />
                  {/* Update button to call viewSubmissions with member's name */}
                  <button className="view-submissions-btn" onClick={() => viewSubmissions(member.name.replace(/ /g, '-'))}>
                    View Submissions
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-coordinators">No student coordinators found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCoordinators;
