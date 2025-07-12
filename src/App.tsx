import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import AuraBox from './pages/AuraBox';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import BetaProgram from './pages/BetaProgram';
import ScheduleDemo from './pages/ScheduleDemo';
import Investor from './pages/Investor';
import PreOrder from './pages/PreOrder';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import MyDevices from './pages/MyDevices';
import AIHealthAssistant from './pages/AIHealthAssistant';
import Appointments from './pages/Appointments';
import Orders from './pages/Orders';
import LearningCenter from './pages/LearningCenter';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <ScrollToTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/aurabox" element={<AuraBox />} />
                <Route path="/services" element={<Services />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/beta-program" element={<BetaProgram />} />
                <Route path="/schedule-demo" element={<ScheduleDemo />} />
                <Route path="/investor" element={<Investor />} />
                <Route path="/pre-order" element={<PreOrder />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/my-devices" element={<MyDevices />} />
                <Route path="/ai-health-assistant" element={<AIHealthAssistant />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/learning-center" element={<LearningCenter />} />
              </Routes>
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;