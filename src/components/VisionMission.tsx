import React from 'react';
import { Eye, Target, TrendingUp, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VisionMission: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="vision" ref={ref} className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className={`card text-center border-t-4 border-primary transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              "To be the leading electrical and general contractor in the region, expanding into innovative IT solutions while maintaining excellence in service delivery."
            </p>
          </div>

          {/* Mission */}
          <div className={`card text-center border-t-4 border-secondary transition-all duration-700 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To deliver exceptional electrical, general contracting, and IT services that exceed client expectations through innovation, quality workmanship, and unwavering commitment to safety and reliability.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className={`text-2xl font-bold text-primary text-center mb-8 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Excellence', desc: 'Striving for perfection in every project' },
              { icon: Users, title: 'Integrity', desc: 'Honest and transparent business practices' },
              { icon: Target, title: 'Innovation', desc: 'Embracing modern technology and solutions' },
              { icon: Eye, title: 'Safety First', desc: 'Prioritizing safety in all operations' }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center p-4 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-bold text-primary mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;