import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--nav-border)] py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--secondary)] text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Gaeuly. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-[var(--secondary)]">
            <a 
              href="/terms-of-service" 
              className="hover:text-[var(--primary)] transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/privacy-policy" 
              className="hover:text-[var(--primary)] transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}