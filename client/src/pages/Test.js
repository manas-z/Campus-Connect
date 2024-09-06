import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import testImage from './Test.png'; // Import the image properly

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
          <Link className="navbar-brand" to="#">Campus Connect</Link>
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
                  to="#home"
                  onClick={() => handleSetActive('home')}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                  to="#features"
                  onClick={() => handleSetActive('features')}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  to="#contact"
                  onClick={() => handleSetActive('contact')}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
                  to="#faq"
                  onClick={() => handleSetActive('faq')}
                >
                  FAQ
                </Link>
              </li>
            </ul>
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
        {/* Home Section */}
        <div id="home" className="row home-section">
          <div className="col-lg-6">
            <p className="subheadline text-muted">Learning Beyond Boundaries</p>
            <h1 className="display-4 font-weight-bold text-light">
              The Ultimate Tailor Made <br />E-Connect Platform
            </h1>
            <p className="lead text-light mt-3">
              Campus Connect is your go-to platform to connect, collaborate, and communicate with your peers, faculty, and alumni. Whether you’re looking to join study groups, attend virtual events, or network with professionals, we’ve got you covered.
            </p>
            <Link to="/registration1" className="btn btn-primary btn-lg mt-4">Register Now</Link>
          </div>
          <div className="col-lg-6 position-relative">
            <img src={testImage} className="img-fluid rounded animated-image" alt="Campus Connect" />
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="features-section text-center mt-5">
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle text-muted">Discover what makes Campus Connect the best choice for students.</p>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Connect with Peers</h5>
                  <p className="card-text text-muted">Find and connect with friends, classmates, and study groups. Share ideas, resources, and stay connected effortlessly.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Collaborate on Projects</h5>
                  <p className="card-text text-muted">Join forces with fellow students on projects and assignments. Use our collaboration tools to work together seamlessly.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Access Resources</h5>
                  <p className="card-text text-muted">Get access to a wide range of academic resources, including e-books, research papers, and online courses.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Virtual Events</h5>
                  <p className="card-text text-muted">Participate in webinars, workshops, and seminars hosted by industry experts and gain valuable insights.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Job Opportunities</h5>
                  <p className="card-text text-muted">Explore internships and job opportunities exclusive to our members. Build your career with Campus Connect.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Mentorship</h5>
                  <p className="card-text text-muted">Connect with mentors and alumni who can guide you in your academic and career journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="contact-section text-center mt-5">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle text-muted">We'd love to hear from you! Whether you have a question or need assistance, our team is here to help.</p>
          <div className="contact-form mt-4">
            <input type="text" className="form-control mb-3" placeholder="Your Name" />
            <input type="email" className="form-control mb-3" placeholder="Your Email" />
            <textarea className="form-control mb-3" rows="4" placeholder="Your Message"></textarea>
            <button className="btn btn-primary">Send Message</button>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="faq-section text-center mt-5">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="accordion mt-4" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  What is Campus Connect?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Campus Connect is an online platform that helps students, alumni, and faculty connect, collaborate, and communicate seamlessly.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How do I register?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can register by clicking the "Register Now" button on the homepage and filling out the required details.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Is there a membership fee?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  No, Campus Connect is free for all students, faculty, and alumni. There are no hidden fees or charges.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  How do I reset my password?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  If you've forgotten your password, click the "Forgot Password" link on the login page and follow the instructions to reset it.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p id="footer" className="text-center mt-5 text-light">Campus Connect © 2024. All rights reserved.</p>
    </div>
  );
};

export default Test;
