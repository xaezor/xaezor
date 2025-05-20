import React from 'react';
import './Assets/css/hstyle.css';
import Footer from './Components/Footer';
import { Header } from './Components/Header';
import Main from './Components/Main';
import { Apps } from './Components/Apps';
import { Projects } from './Components/Projects';
import { Join } from './Components/Join';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Modify from './Components/Modify';


function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register', '/profile', '/modify'].includes(location.pathname);

  const appStyle = {
    cursor: `url(${process.env.PUBLIC_URL + '/cursor.cur'}), auto`,
    minHeight: '100vh',
    width: '100%'
  };

  return (
    <div style={appStyle}>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/modify" element={<Modify />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
