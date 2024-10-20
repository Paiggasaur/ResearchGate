import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Adjust the import path as necessary

const Header = () => {
  return (
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
  );
};

export default Header;