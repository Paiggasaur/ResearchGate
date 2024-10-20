import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import portfolio from './portfolio.webp';
import stats from './stats.webp';
import port2 from './port2.webp';
import logo from './logo.png';

/**
 * @author
 * @function HomePage
 **/

export const HomePage = (props) => {
  // State to hold fetched member counts
  const [clubData, setClubData] = useState([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/club-count/')
      .then((response) => response.json())
      .then((data) => setClubData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <header>
        <nav
          style={{
            height: '100px',
            backgroundColor: '#2b7a78',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to=""
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                id="pic"
                src={logo}
                alt="Logo"
                style={{
                  height: '70px',
                  width: '70px',
                  marginRight: '15px',
                  borderRadius: '5px',
                }}
              />
              <h2 style={{ fontSize: '1.8em', color: 'white', margin: '0' }}>
                SIT ResearchGate
              </h2>
            </Link>
          </div>
        </nav>
      </header>

      <section style={{ display: 'flex', padding: '20px' }}>
        <article
          style={{
            width: '50%',
            padding: '50px',
            paddingRight: '20px', // Adjust right padding for better alignment
          }}
        >
          <h1 style={{ fontSize: '60px' }}>Get started with your Next Paper!!</h1>
          <p>1. Master the skills required for academic writing, including structuring, citations, and ethical considerations.</p>
          <p>2. Build a portfolio of published or peer-reviewed research to enhance career opportunities.</p>
          <p>3. Develop confidence in presenting and defending research in both local and international forums.</p>

          <div className="sujal" style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <Link to="/login">
              <button style={buttonStyle}>ResearchGate Portfolio</button>
            </Link>
            <Link to="/faculty-coordinators">
              <button style={buttonStyle}>View Faculty Coordinators</button>
            </Link>
            <Link to="/current_members">
              <button style={buttonStyle}>View Members</button>
            </Link>
            <Link to="/student-coordinators">
              <button style={buttonStyle}>View Student Coordinators</button>
            </Link>
          </div>
        </article>

        <aside style={{ width: '45%', paddingTop: '100px' }}>
          <figure>
            <img
              src={portfolio}
              alt="Portfolio"
              style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
            />
          </figure>
        </aside>
      </section>

      <section style={{ display: 'flex', padding: '20px', backgroundColor: '#f7f7f7' }}>
        <article
          style={{
            width: '50%',
            padding: '50px',
          }}
        >
          <h1 style={{ fontSize: '2em', color: '#3b3b3b' }}>Current Stats</h1>

          {clubData.length > 0 ? (
            <div>
              {clubData.map((club, index) => (
                <p key={index} style={{ fontSize: '1.2em', margin: '10px 0' }}>
                  {club.year} - {club.member_count} Members
                </p>
              ))}
            </div>
          ) : (
            <p>Loading stats...</p>
          )}
        </article>

        <aside style={{ width: '45%', paddingTop: '100px' }}>
          <figure>
            <img
              src={stats}
              alt="stats"
              style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
            />
          </figure>
        </aside>
      </section>

      <section style={{ display: 'flex', padding: '20px' }}>
        <article
          style={{
            width: '50%',
            padding: '50px',
          }}
        >
          <img
            src={port2}
            alt="Portfolio2"
            style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
          />
        </article>

        <article style={{ width: '50%', paddingLeft: '50px', paddingTop: '50px' }}>
          <h1 style={{ fontSize: '2em', color: '#3b3b3b' }}>Annual Events</h1>
          <p style={{ fontSize: '1.2em', margin: '10px 0' }}>The Scholar's Script</p>
          <p style={{ fontSize: '1.2em', margin: '10px 0' }}>The Scholar's Bridge: Projects to Publications</p>
        </article>
      </section>
    </div>
  );
};

// Common button style
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2b7a78',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginBottom: '10px', // Adds space between buttons
  cursor: 'pointer', // Changes cursor to pointer
  fontSize: '1em', // Adjust font size
  transition: 'background-color 0.3s', // Adds transition effect
};

// Add hover effect
buttonStyle[':hover'] = {
  backgroundColor: '#1f5f5d', // Darker shade on hover
};
