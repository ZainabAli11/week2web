import { Link, Outlet } from "react-router-dom";

const Dashboard = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  const cardStyle = {
    backgroundColor: isDark ? "#2a2a2a" : "#f0f4f8",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: isDark
      ? "0 4px 12px rgba(0,0,0,0.8)"
      : "0 4px 10px rgba(0,0,0,0.1)",
    textDecoration: "none",
    color: isDark ? "#ddd" : "#2c3e50",
    flex: "1 1 250px",
    maxWidth: "300px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const iconStyle = {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  };

  const toggleButtonStyle = {
    backgroundColor: isDark ? "#2980b9" : "#3498db",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "flex-start",
    transition: "background-color 0.3s ease",
  };

  const headingStyle = {
    color: isDark ? "#eee" : "#2c3e50",
    marginBottom: "1rem",
  };

  const paragraphStyle = {
    color: isDark ? "#bbb" : "#555",
    marginBottom: "2rem",
    maxWidth: "600px",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <h2 style={headingStyle}>📊 Dashboard</h2>
      <p style={paragraphStyle}>
        Welcome to your dashboard. Manage your profile, update settings, and
        customize your experience.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <Link to="profile" style={cardStyle}>
          <div style={iconStyle}>👤</div>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>Profile</h3>
          <p style={{ fontSize: "0.9rem", color: isDark ? "#ccc" : "#666" }}>
            View and update your personal information.
          </p>
        </Link>

        <Link to="settings" style={cardStyle}>
          <div style={iconStyle}>⚙️</div>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>Settings</h3>
          <p style={{ fontSize: "0.9rem", color: isDark ? "#ccc" : "#666" }}>
            Manage preferences, notifications, and themes.
          </p>
        </Link>
      </div>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        style={toggleButtonStyle}
      >
        Toggle Theme: {isDark ? "🌙 Dark" : "🌞 Light"}
      </button>

      <div style={{ flex: 1, marginTop: "2rem" }}>
        <Outlet context={{ theme, setTheme }} />
      </div>
    </div>
  );
};

export default Dashboard;
