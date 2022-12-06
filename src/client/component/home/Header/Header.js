import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="ccol-ig-12">
            <h2>Welcome to seen</h2>
            <p>Seen est une platforme vidéo conférance </p>
            <form>
              <input type="text" placeholder="ID " />
              <input type="text" placeholder="Password" />
              <button type="submit">Rejoindre la reunion</button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
