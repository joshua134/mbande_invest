import React from 'react';
import { Bolt, Zap, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bolt className="w-6 h-6 text-yellow-400" />
              <Zap className="w-6 h-6 text-yellow-400" />
              <Code2 className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mbande Investment Ltd</h3>
            <p className="text-gray-400 text-sm">
              SOARING TO NEW HEIGHTS
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Electrical & General Contractors | IT Services
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('quote')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Request Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+254722886751" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  📞 +254 722 886751
                </a>
              </li>
              <li>
                <a href="tel:+254722691081" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  📞 +254 722 691081
                </a>
              </li>
              <li>
                <a href="mailto:isiyejoshua@gmail.com" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  📧 isiyejoshua@gmail.com
                </a>
              </li>
              <li>
                <p className="text-gray-400">📍 P.O. Box 1540 - 50205, Webuye</p>
              </li>
            </ul>
          </div>

          {/* MD Signature */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Management</h4>
            <div className="border-l-2 border-yellow-400 pl-4">
              <p className="font-semibold">Peter Isiye</p>
              <p className="text-gray-400 text-sm">Managing Director</p>
              <p className="text-gray-400 text-xs mt-2">"Committed to excellence"</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Mbande Investment Ltd. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Licensed Electrical Contractor | IT Solutions Provider | General Contractors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;