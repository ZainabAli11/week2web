import { useOutletContext } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme } = useOutletContext();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div>
      <h3>⚙️ Settings</h3>
      <p>Manage your preferences, notifications, and account settings here.</p>
      <form>
        <label>Notification Preferences</label>
        <select>
          <option>Email Only</option>
          <option>SMS Only</option>
          <option>Email & SMS</option>
          <option>None</option>
        </select>

        <label>Change Password</label>
        <input type="password" placeholder="New Password" />

        <label>Theme</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
