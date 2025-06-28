import React from 'react';
import { Heart, Github, Linkedin, Cloud } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-16 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Cloud className="w-8 h-8 text-white drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-white">Weather Pro</span>
          </div>

          {/* Made with love attribution */}
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
            <span className="text-sm">by</span>
            <span className="font-semibold text-white">Manasi Patil</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/manasi262005"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 text-white group-hover:text-white/90" />
            </a>
            <a
              href="https://linkedin.com/in/manasi-patil-4a8645348"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 text-white group-hover:text-blue-300" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            © {currentYear} Weather Pro. All rights reserved.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;