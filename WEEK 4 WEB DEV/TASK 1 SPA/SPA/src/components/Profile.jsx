const Profile = () => (
  <div>
    <h3>👤 User Profile</h3>
    <p>Welcome to your profile page. Here you can view and edit your personal information.</p>

    <form>
      <label>Full Name</label>
      <input type="text" placeholder="John Doe" />

      <label>Email Address</label>
      <input type="email" placeholder="john@example.com" />

      <label>Bio</label>
      <textarea rows="3" placeholder="Tell us about yourself..."></textarea>

      <button type="submit">Update Profile</button>
    </form>
  </div>
);

export default Profile;
