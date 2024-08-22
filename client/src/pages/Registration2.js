import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Assuming you have the same CSS file

const Registration2 = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Sign up process completed successfully!');
    navigate('/registration1');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="#container">Campus Connect</Link>
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
                <Link className="nav-link" to="#footer">Features</Link>
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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-light">About Yourself</h3>

                  <form className="px-md-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Name:" />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Age:" />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Current Year:" />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Name of Course:" />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Year of Graduation:" />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="5" placeholder="Bio:"></textarea>
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="5" placeholder="Interested Fields:"></textarea>
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="5" placeholder="Specialty Fields:"></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileImage" className="form-label">Upload Profile Image:</label>
                      <input type="file" className="form-control" id="profileImage" />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
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

export default Registration2;
