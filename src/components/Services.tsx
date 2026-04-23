import React from 'react';
import { Zap, Wrench, Code2, Network, Lightbulb, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const services = [
    {
      icon: Zap,
      title: 'Electrical Services',
      description: 'Complete electrical installations, wiring, repairs, and maintenance for residential and commercial properties.',
      items: ['Power supply installation', 'Electrical wiring', 'Circuit breakers', 'Lighting systems']
    },
    {
      icon: Wrench,
      title: 'General Contracting',
      description: 'Comprehensive contracting services for various infrastructure and maintenance projects.',
      items: ['Bush clearing', 'Firewood supply to schools', 'Site preparation', 'Maintenance services']
    },
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications for businesses and organizations.',
      items: ['Business websites', 'E-commerce platforms', 'Progressive Web Apps', 'CMS integration']
    },
    {
      icon: Network,
      title: 'Network Solutions',
      description: 'Professional networking and connectivity solutions for seamless operations.',
      items: ['Network setup & configuration', 'WiFi installation', 'Network security', 'Cabling']
    },
    {
      icon: Lightbulb,
      title: 'IT Consulting',
      description: 'Strategic technology consulting to help your business grow and innovate.',
      items: ['IT infrastructure planning', 'Digital transformation', 'System integration', 'Tech support']
    },
    {
      icon: Shield,
      title: 'KPLC Contracting',
      description: 'Authorized contractor for Kenya Power & Lighting Company projects.',
      items: ['Power line maintenance', 'Transformer installation', 'Meter installation', 'Emergency response']
    }
  ];

  return (
    <section id="services" ref={ref} className="py-20 bg-white">
      <div className="container-custom">
        <h2 className={`section-title transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Our Services
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Comprehensive solutions for all your electrical, contracting, and IT needs
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index} 
                className={`card group hover:border-primary/20 transition-all duration-700 delay-${index * 100} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;