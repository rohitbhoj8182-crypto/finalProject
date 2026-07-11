import { useState } from "react";
import Reveal from "./Reveal.jsx";

//added backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "", type: "" });
    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (res.ok) {
        setStatus({ text: "Message sent — thanks! I'll get back to you soon.", type: "ok" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ text: result.error || "Something went wrong. Please try again.", type: "err" });
      }
    } catch (err) {
      setStatus({ text: "Couldn't reach the server. Is the backend running?", type: "err" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <p className="section-tag">05 · contact</p>
        <h2 className="section-title">Let's build something</h2>
        <p className="section-note">Drop a message — it's sent through Brevo, straight to my inbox.</p>
      </div>

      <Reveal as="form" className="contact-form" onSubmit={handleSubmit}>
        <div className="f-row">
          <div className="f-group">
            <label htmlFor="f-name">Name</label>
            <input
              type="text"
              id="f-name"
              name="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="f-group">
            <label htmlFor="f-email">Email</label>
            <input
              type="email"
              id="f-email"
              name="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="f-group">
          <label htmlFor="f-message">Message</label>
          <textarea
            id="f-message"
            name="message"
            rows="5"
            required
            placeholder="What's on your mind?"
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-submit" disabled={sending}>
          <span>{sending ? "Sending..." : "Send message"}</span>
        </button>
        <p className={`form-status${status.type ? " " + status.type : ""}`} role="status">
          {status.text}
        </p>
      </Reveal>
    </section>
  );
}
