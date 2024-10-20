import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Submissions.css';
const Submissions = () => {
  const { memberName } = useParams(); // Get the member name from the URL
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/submissions/${memberName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [memberName]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Submissions for {memberName.replace(/-/g, ' ')}</h1>
      {loading ? (
        <p>Loading submissions...</p>
      ) : (
        <ul>
          {submissions.length > 0 ? (
            submissions.map((submission, index) => (
              <li key={index}>
                <h2>{submission.title}</h2>
                <p><strong>Domain:</strong> {submission.domain}</p>
                <p><strong>Date of Submission:</strong> {submission.date_of_submission}</p>
              </li>
            ))
          ) : (
            <p>No submissions found for this member.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Submissions;
