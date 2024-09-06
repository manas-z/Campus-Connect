import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration1 from './pages/Registration1';
import Registration2 from './pages/Registration2';
import Login from './pages/Login';
import Test from './pages/Test';
import DashboardPage from './pages/DashboardPage';
import ChatForum from './pages/ChatForum';
import ConnectionsPage from './pages/ConnectionsPage'; // Import new page
import ProfilePage from './pages/ProfilePage'; // Import profile page
import NotFound from './pages/NotFound'; // Import a NotFound component to handle 404s

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/test" />} /> 

        {/* Specific Routes */}
        <Route path="/registration1" element={<Registration1 />} />
        <Route path="/registration2" element={<Registration2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboardpage" element={<DashboardPage />} />
        <Route path="/chatforum" element={<ChatForum />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
