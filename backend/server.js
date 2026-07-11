/* ============================================================
   ROHIT BHOJ — PORTFOLIO BACKEND
   Simple Express server that forwards contact-form submissions
   to Brevo's transactional email API.
============================================================ */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL; // must be a verified sender in Brevo
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Portfolio Contact Form";
const OWNER_EMAIL = process.env.OWNER_EMAIL; // where you want to receive messages (e.g. Rohit's inbox)
const OWNER_NAME = process.env.OWNER_NAME || "Rohit Bhoj";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// simple in-memory rate limiter (per IP, resets every window)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);

  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
  }
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "rohit-bhoj-portfolio-backend" });
});

app.post("/api/contact", rateLimit, async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !OWNER_EMAIL) {
      console.error("Missing Brevo configuration. Check your .env file.");
      return res.status(500).json({ error: "Email service isn't configured yet." });
    }

    // Notification email to the site owner
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: OWNER_EMAIL, name: OWNER_NAME }],
        replyTo: { email, name },
        subject: `New portfolio message from ${name}`,
        htmlContent: `
          <div style="font-family:sans-serif; line-height:1.6;">
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          </div>
        `,
      },
      { headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" } }
    );

    // Optional auto-reply confirmation to the visitor
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: OWNER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email, name }],
        subject: `Thanks for reaching out, ${name}!`,
        htmlContent: `
          <div style="font-family:sans-serif; line-height:1.6;">
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thanks for your message — I've received it and will get back to you soon.</p>
            <p>— ${OWNER_NAME}</p>
          </div>
        `,
      },
      { headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" } }
    ).catch((err) => {
      // Don't fail the whole request if only the auto-reply fails
      console.warn("Auto-reply email failed:", err.response?.data || err.message);
    });

    return res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Brevo send error:", err.response?.data || err.message);
    return res.status(502).json({ error: "Failed to send your message. Please try again later." });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
