import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const contacts = [
    { icon: Phone, label: 'Main Line', value: '+254 722 886751', href: 'tel:+254722886751' },
    { icon: Phone, label: 'Alternative 1', value: '+254 722 691081', href: 'tel:+254722691081' },
    { icon: Phone, label: 'Alternative 2', value: '+254 703 898056', href: 'tel:+254703898056' },
    { icon: Phone, label: 'Alternative 3', value: '+254 735 886757', href: 'tel:+254735886757' },
    { icon: Mail, label: 'Primary Email', value: 'isiyejoshua@gmail.com', href: 'mailto:isiyejoshua@gmail.com' },
    { icon: Mail, label: 'Secondary Email', value: 'mbandeinvest@yahoo.com', href: 'mailto:mbandeinvest@yahoo.com' },
    { icon: MapPin, label: 'Address', value: 'P.O. Box 508 - 50205, Webuye, Kenya', href: 'https://maps.google.com/?q=Webuye+Kenya' },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className={`section-title transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Contact Us
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Get in touch with us for any inquiries or project discussions
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.icon === MapPin ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{contact.label}</p>
                    <p className="font-semibold text-gray-800">{contact.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Business Hours & Map */}
          <div className="space-y-6">
            <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">Business Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-semibold">Closed (Emergency only)</span>
                </div>
              </div>
            </div>

            {/* Google Maps Location */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="bg-primary p-3">
                <h3 className="text-white font-semibold text-center">Find Us</h3>
              </div>
              <div className="p-2">
                <iframe
                  title="Mbande Investment Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.54306935515!2d34.719213!3d0.607975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1780590be788c1a3%3A0x8d9b8b8b8b8b8b8b!2sWebuye%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;