import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">
          <h3><span>M</span>ahlet</h3>
        </div>
        <div
          className={`nav-toggle${menuOpen ? ' active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          <li className="nav-item">
            <a href="#header" className="nav-link" onClick={closeMenu}><span>Home</span></a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={closeMenu}>About Me</a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a>
          </li>
          <li className="nav-item">
            <a href="#contacts" className="nav-link" onClick={closeMenu}>Contacts</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
