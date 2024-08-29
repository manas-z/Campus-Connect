import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration1 from './pages/Registration1';
import Registration2 from './pages/Registration2';
import Login from './pages/Login';
import Test from './pages/Test';
import DashboardPage from './pages/DashboardPage';
import ChatForum from './pages/ChatForum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} /> {/* Set Test as the default route */}
        <Route path="/registration1" element={<Registration1 />} />
        <Route path="/registration2" element={<Registration2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboardpage" element={<DashboardPage />} />
        <Route path="/chatforum" element={<ChatForum />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;