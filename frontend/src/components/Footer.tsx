import React from "react";
import { Github, Linkedin } from "lucide-react"; // Import Lucide icons

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-blue-700 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* App Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Byte<span className="text-yellow-300">Write</span>
          </h2>
          <p className="text-sm text-gray-200">
            A blog app to share your ideas with the world. Product by{" "}
            <span className="text-yellow-300">Vardaan Bhatia.</span>
          </p>
        </div>

        {/* Social Links with Icons */}
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="https://github.com/vardaan-bhatia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-yellow-300 transition-all duration-300 transform hover:scale-110"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/vardaan-bhatia-028446203/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-yellow-300 transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} ByteWrite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
