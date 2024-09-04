import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Registration2 = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [courseName, setCourseName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [bio, setBio] = useState('');
  const [interestedFields, setInterestedFields] = useState('');
  const [specialtyFields, setSpecialtyFields] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      alert('User not registered. Please register first.');
      navigate('/registration1');
      return;
    }

    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('currentYear', currentYear);
    formData.append('courseName', courseName);
    formData.append('graduationYear', graduationYear);
    formData.append('bio', bio);
    formData.append('interestedFields', interestedFields);
    formData.append('specialtyFields', specialtyFields);
    formData.append('profileImage', profileImage);

    try {
      const response = await fetch('http://localhost:5000/complete-registration', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Sign up process completed successfully!');
        navigate('/login');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
     
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Campus Connect</Link>
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
                <Link className="nav-link" to="/">Home</Link>
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


      <section className="h-100 h-custom" style={{ backgroundColor: '#181c32', color: '#f8f8f2' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3" style={{ backgroundColor: '#1f2136' }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-light">About Yourself</h3>

                  <form className="px-md-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name:"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Age:"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Current Year:"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name of Course:"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Year of Graduation:"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Bio:"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Interested Fields:"
                        value={interestedFields}
                        onChange={(e) => setInterestedFields(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Specialty Fields:"
                        value={specialtyFields}
                        onChange={(e) => setSpecialtyFields(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileImage" className="form-label">Upload Profile Image:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
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
