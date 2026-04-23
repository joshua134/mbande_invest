import React from 'react';
import { Building2, HardHat, Wrench } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className={`section-title transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          About Us
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Excellence in electrical contracting since establishment
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong className="text-primary">Mbande Investment Ltd</strong> is a premier electrical and general contracting company based in Webuye, Kenya. With years of experience as a trusted contractor for <strong className="text-primary">Kenya Power & Lighting Company (KPLC)</strong>, we have successfully delivered numerous projects including power supply installation, electricity distribution, bush clearing, and firewood supply to educational institutions across the region.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Led by our Managing Director <strong className="text-primary">Peter Isiye</strong>, our team is committed to excellence, safety, and innovation. We are now proudly expanding our services to include cutting-edge <strong className="text-primary">IT solutions</strong>, making us your one-stop partner for both infrastructure and technology needs.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-3 inline-block mb-2">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm">Licensed</p>
                <p className="text-xs text-gray-500">Electrical Contractor</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-3 inline-block mb-2">
                  <HardHat className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm">KPLC</p>
                <p className="text-xs text-gray-500">Registered Contractor</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-3 inline-block mb-2">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm">Multi-disciplinary</p>
                <p className="text-xs text-gray-500">Services</p>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-xl shadow-xl p-8 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              {[
                'Proven track record with KPLC',
                'Qualified and experienced team',
                'Safety-first approach',
                'Timely project delivery',
                'Competitive pricing',
                '24/7 customer support',
                'Modern IT solutions'
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;