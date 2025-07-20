import React from 'react';


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Pet Finder</h2>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/adopt">Adopt</a></li>
          <li><a href="/favorites">Favorites</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;