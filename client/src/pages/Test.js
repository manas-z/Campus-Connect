import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Test = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">Campus Connect</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav nav-pills mx-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  aria-current="page"
                  to="#"
                  onClick={() => handleSetActive('home')}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                  href="#footer"
                  onClick={() => handleSetActive('features')}
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleSetActive('contact')}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleSetActive('faq')}
                >
                  FAQ
                </a>
              </li>
            </ul>
            {/* Register and Login Buttons */}
            <div className="navbar-buttons">
              <Link className="btn btn-primary ml-2" to="/registration1">
                Register Now
              </Link>
              <Link className="btn btn-secondary ml-2" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-left py-5" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-lg-6">
            <p className="subheadline text-muted">Learning Beyond Boundaries</p>
            <h1 className="display-4 font-weight-bold text-light">
              The Ultimate Tailor Made <br />E-Connect Platform
            </h1>
            <Link to="/registration1" className="btn btn-primary btn-lg mt-4">Register Now</Link>
          </div>
          <div className="col-lg-6 position-relative">
            <img src="https://via.placeholder.com/500x300" className="img-fluid rounded" alt="Video Placeholder" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="row mt-5">
          <div className="col-lg-4 mb-4">
            <div className="card text-center shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Connect</h5>
                <p className="card-text text-muted">Connect with your friends and batchmates.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card text-center shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Collaborate</h5>
                <p className="card-text text-muted">Collaborate with other students with similar interests.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card text-center shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">Communicate</h5>
                <p className="card-text text-muted">Communicate with fellow alumni and seniors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p id="footer" className="text-center mt-5 text-light">Campus Connect</p>
    </div>
  );
};

export default Test;
