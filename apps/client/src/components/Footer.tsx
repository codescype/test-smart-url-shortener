
import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto py-6 mt-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShortLink. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
