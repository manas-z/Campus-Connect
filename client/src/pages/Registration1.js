import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Registration1 = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  const validateForm = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return false;
    }
    navigate('/registration2');
    return true;
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#container">Campus Connect</a>
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
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#footer">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">FAQ</Link>
              </li>
            </ul>
            <div className="header-right">
              <div className="dropdown">
                <Link className="btn btn-primary ml-2 dropdown-toggle" to="/registration1">
                  Register Now
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="h-100 h-custom" style={{ backgroundColor: '#181c32', color: '#f8f8f2' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3" style={{ backgroundColor: '#1f2136' }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-light">Sign Up</h3>

                  <form className="px-md-2" onSubmit={validateForm}>
                    <div className="form-outline mb-4 position-relative">
                      <input type="email" id="form3Example1e" className="form-control" placeholder="Email" required />
                    </div>

                    <div className="form-outline mb-4 position-relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="form3Example1p"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-link position-absolute end-0 top-0 mt-2 me-2"
                        type="button"
                        onClick={() => togglePasswordVisibility(setPasswordVisible)}
                      >
                        <i className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'}`} id="togglePasswordIcon1"></i>
                      </button>
                    </div>

                    <div className="form-outline mb-4 position-relative">
                      <input
                        type={repeatPasswordVisible ? 'text' : 'password'}
                        id="form3Example1rp"
                        className="form-control"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-link position-absolute end-0 top-0 mt-2 me-2"
                        type="button"
                        onClick={() => togglePasswordVisibility(setRepeatPasswordVisible)}
                      >
                        <i className={`bi ${repeatPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`} id="togglePasswordIcon2"></i>
                      </button>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg mb-1">Proceed</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration1;
