import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTachometerAlt, FaIcons, FaMap, FaBell, FaUser, FaTable, FaFont, FaLifeRing, FaSearch } from 'react-icons/fa';
import './Dashboard.css';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const lineData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Total Shipments',
        data: [85, 90, 78, 85, 95, 100, 90, 110, 105, 115, 120, 110],
        borderColor: '#42a5f5', // Light blue line color
        backgroundColor: 'rgba(66, 165, 245, 0.1)', // Light blue shading under the line
        pointBackgroundColor: '#42a5f5', // Light blue points
        pointBorderColor: '#42a5f5',
        fill: true,
        tension: 0.4, // Smooth curve
      }
    ]
  };

  const barData = {
    labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [50, 45, 60, 70, 40, 50],
        backgroundColor: '#ab47bc' // Color for the bars
      }
    ]
  };

  const lineOptions = {
    plugins: {
      legend: {
        display: false, // Hide legend to match the look
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: '#cfd8dc', // Light gray for x-axis labels
        }
      },
      y: {
        grid: {
          color: 'rgba(207, 216, 220, 0.1)', // Very faint grid lines
        },
        ticks: {
          color: '#cfd8dc', // Light gray for y-axis labels
        },
        beginAtZero: true,
        max: 130, // Ensure space at the top of the graph
      }
    }
  };

  return (
    <div className="dashboard-page">
      <header className="header">
        <div className="logo">DASHBOARD</div>
        <div className="user-search">
          {showSearch && <input type="text" className="search-bar" placeholder="Search..." />}
          <FaSearch className="icon" onClick={toggleSearch} />
          <FaUser className="icon user-icon" />
        </div>
      </header>

      <div className="content">
        <div className="sidebar">
          <h2>Creative Tim</h2>
          <ul>
            <li><FaTachometerAlt /> Dashboard</li>
            <li><FaIcons /> Icons</li>
            <li><FaMap /> Map</li>
            <li><FaBell /> Notifications</li>
            <li><FaUser /> User Profile</li>
            <li><FaTable /> Table List</li>
            <li><FaFont /> Typography</li>
            <li><FaLifeRing /> RTL Support</li>
          </ul>
        </div>

        <div className="main-content">
          <div className="dashboard">
            <div className="performance">
              <h3>Total Shipments</h3>
              <Line data={lineData} options={lineOptions} />
            </div>
            <div className="stats">
              <div className="box">
                <h3>763,215</h3>
                <p>Total Shipments</p>
              </div>
              <div className="box">
                <h3>3,500€</h3>
                <Bar data={barData} />
              </div>
              <div className="box">
                <h3>12,100K</h3>
                <p>Completed Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
