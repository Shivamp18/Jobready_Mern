import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-3">
      <div className="container text-center">
        <div className="mb-3">
          {/* Social Media Icons (Replace '#' with real links if needed) */}
          <a href="#" className="text-light me-3 fs-5">
            <i className="bi bi-github"></i>
          </a>
          <a href="#" className="text-light me-3 fs-5">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#" className="text-light me-3 fs-5">
            <i className="bi bi-envelope-fill"></i>
          </a>
          <a href="#" className="text-light fs-5">
            <i className="bi bi-globe"></i>
          </a>
        </div>

        <p className="small mb-0">
          &copy; {new Date().getFullYear()} JobReady. Built with ❤️ for future engineers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
