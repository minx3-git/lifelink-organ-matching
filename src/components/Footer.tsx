"use client";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-10 pb-4 px-4 md:px-12 mt-16 border-t border-maroon-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold text-maroon-300 mb-2">About LifeLink</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            LifeLink is dedicated to bridging the gap between organ donors and recipients, raising awareness, and making the process of organ donation accessible, transparent, and compassionate for all.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-maroon-300 mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-maroon-400 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-maroon-400 transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-maroon-400 transition-colors">Contact</a></li>
            <li><a href="/privacy-policy" className="hover:text-maroon-400 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-maroon-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h2 className="text-lg font-bold text-maroon-300 mb-2">Resources</h2>
          <ul className="space-y-1">
            <li><a href="https://www.who.int/initiatives/who-task-force-on-organ-donation-and-transplantation" target="_blank" rel="noopener noreferrer" className="hover:text-maroon-400 transition-colors">WHO Credentials</a></li>
            <li><a href="https://karunyaseva.kerala.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-maroon-400 transition-colors">Karunya Seva (Kerala)</a></li>
            <li><a href="https://www.organdonationawareness.org/" target="_blank" rel="noopener noreferrer" className="hover:text-maroon-400 transition-colors">Organ Donation Awareness</a></li>
          </ul>
        </div>
        {/* Contact & Social Media */}
        <div>
          <h2 className="text-lg font-bold text-maroon-300 mb-2">Contact & Social</h2>
          <ul className="space-y-1 mb-3">
            <li>
              <a href="mailto:info@lifelink.org" className="hover:text-maroon-400 transition-colors">info@lifelink.org</a>
            </li>
            <li>
              <a href="tel:+911234567890" className="hover:text-maroon-400 transition-colors">+91 12345 67890</a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-maroon-400 transition-colors text-2xl"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-maroon-400 transition-colors text-2xl"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-maroon-400 transition-colors text-2xl"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-maroon-400 transition-colors text-2xl"><FaFacebook /></a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-maroon-900 pt-4 text-center text-xs text-gray-500">
        &copy; {currentYear} LifeLink. All rights reserved.
      </div>
    </footer>
  );
}
