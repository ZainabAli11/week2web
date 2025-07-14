import { useState } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={theme === "dark" ? "app-wrapper dark-theme" : "app-wrapper"}>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected dashboard routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard theme={theme} setTheme={setTheme} />
              </PrivateRoute>
            }
          >
            {/* Nested routes for Dashboard */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="footer">
        © 2025 My React SPA.<br /> Zainab Ali | All rights reserved.
      </footer>
    </div>
  );
}
