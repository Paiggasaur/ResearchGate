import React, { useEffect, useState } from 'react';
import Header from './Header';
const FacultyCoordinator = () => {
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/faculty-coordinators/');
        if (!response.ok) {
          throw new Error('Failed to fetch faculty coordinators');
        }
        const data = await response.json();
        setCoordinators(data);
      } catch (error) {
        console.error('Error fetching faculty coordinators:', error);
      }
    };

    fetchCoordinators();
  }, []);

  return (
    <div style={styles.container}>
    <Header /> 
      <h1 style={styles.header}>Faculty Coordinators</h1>
      {coordinators.length > 0 ? (
        <ul style={styles.list}>
          {coordinators.map((coordinator) => (
            <li key={coordinator.id} style={styles.listItem}>
              <h2 style={styles.coordinatorName}>{coordinator.name}</h2>
              <p><strong>Qualification:</strong> {coordinator.qualification}</p>
              <p><strong>Designation:</strong> {coordinator.designation}</p>
              <p><strong>Department:</strong> {coordinator.department}</p>
              <p><strong>Email:</strong> {coordinator.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading faculty coordinators...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2em',
    color: '#2b7a78',
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '15px',
    margin: '10px 0',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  coordinatorName: {
    fontSize: '1.5em',
    color: '#3b3b3b',
    margin: '0 0 5px',
  },
};

export default FacultyCoordinator;
