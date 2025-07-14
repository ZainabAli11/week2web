const Contact = () => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <h2>📞 Contact Us</h2>
      <p>We'd love to hear from you. Please fill out the form below and we’ll get back to you as soon as possible.</p>
      <form
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Your full name" />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="your@email.com" />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" placeholder="+1 234 567 890" />

        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" placeholder="Subject of your message" />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="8" placeholder="Write your message here..."></textarea>

        <label htmlFor="preferred">Preferred Contact Method</label>
        <select id="preferred">
          <option>Email</option>
          <option>Phone</option>
          <option>Either</option>
        </select>

        <button type="submit" style={{ marginTop: "auto" }}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
