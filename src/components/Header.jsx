// Header.jsx
import React from 'react';

function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        zIndex: 1000, // stays on top
      }}
    >
      <h1 style={{ margin: 0, fontSize:'1.2rem' }}>Adoptable Pets</h1>
    </header>
  );
}

export default Header