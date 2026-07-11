export default function Footer() {
  return (
    <footer className="footer">
      <p>Rohit Bhoj — BTech CSE, 3rd Year</p>
      <div className="footer-links">
        <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#" target="_blank" rel="noopener noreferrer">LeetCode</a>
        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} Rohit Bhoj. Built with GSAP.</p>
    </footer>
  );
}
