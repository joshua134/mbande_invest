import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: 'KPLC Power Line Installation',
      category: 'Electrical',
      description: 'Installation of 33kV power lines serving over 5,000 households in Bungoma County',
      completed: '2011 - 2016'
    },
    {
      title: 'Transformer Maintenance Project',
      category: 'Electrical',
      description: 'Maintenance and upgrade of 45 transformers across Webuye region',
      completed: '2011 - 2016'
    },
    {
      title: 'School Firewood Supply',
      category: 'General Contracting',
      description: 'Reliable firewood supply to 25+ secondary schools in Western Kenya',
      completed: 'Ongoing'
    },
    {
      title: 'Bush Clearing Operations',
      category: 'General Contracting',
      description: 'Vegetation management for power line right-of-ways covering 200+ kilometers',
      completed: '2011 - 2024'
    },
    {
      title: 'Meter Installation Program',
      category: 'Electrical',
      description: 'Installation of prepaid meters for residential and commercial properties',
      completed: '2011 - 2016'
    },
    {
      title: 'IT Infrastructure Setup',
      category: 'IT Services',
      description: 'Network and systems setup for local businesses (New Division)',
      completed: '2025 - Ongoing'
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        <h2 className={`section-title transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Projects Completed
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Delivering excellence across Kenya since our establishment
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Completed: {project.completed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block bg-primary/10 rounded-lg px-6 py-3">
            <p className="text-primary font-semibold">
              🏆 Trusted KPLC Contractor | 100+ Projects Delivered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;