import React, { useState, useEffect } from 'react';
import { Bolt, Zap, Code2, Play, Pause } from 'lucide-react';

const Hero: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote');
    quoteSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Background images for image slideshow (free stock photos)
  const backgroundImages = [
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Electrical lines
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Electrical work
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Construction site
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80', // Technology/IT
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Business team
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
  };

  // Option 1: Static background image (use this for simplicity)
  // Just uncomment the line below and comment out the conditional rendering

  return (
    <>
      {/* OPTION 1: Background Image Slideshow (Recommended) */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-600/80 z-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 container-custom py-20 md:py-32 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6 space-x-2">
              <Bolt className="w-12 h-12 text-yellow-400 animate-pulse" />
              <Zap className="w-12 h-12 text-yellow-400 animate-pulse delay-100" />
              <Code2 className="w-12 h-12 text-yellow-400 animate-pulse delay-200" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up">
              Mbande Investment Ltd
            </h1>
            <p className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-4 animate-fade-in-up animation-delay-200">
              SOARING TO NEW HEIGHTS
            </p>
            <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in-up animation-delay-400">
              Electrical & General Contractors | IT Services
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-600">
              Trusted KPLC contractor with decades of experience. Now expanding into innovative IT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
              <button
                onClick={scrollToQuote}
                className="btn-primary bg-yellow-500 text-blue-900 hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300"
              >
                Request a Quote
              </button>
              <a
                href="tel:+254722886751"
                className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-300"
              >
                Call Now: +254 722 886751
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Image counter indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'w-8 bg-yellow-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
// import React from 'react';
// import { Bolt, Zap, Code2 } from 'lucide-react';

// const Hero: React.FC = () => {
//   const scrollToQuote = () => {
//     const quoteSection = document.getElementById('quote');
//     quoteSection?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
//       <div className="absolute inset-0 bg-black opacity-20"></div>
//       <div className="relative container-custom py-20 md:py-32 flex flex-col items-center justify-center min-h-screen">
//         <div className="text-center animate-fade-in">
//           <div className="flex justify-center mb-6 space-x-2">
//             <Bolt className="w-12 h-12 text-yellow-400" />
//             <Zap className="w-12 h-12 text-yellow-400" />
//             <Code2 className="w-12 h-12 text-yellow-400" />
//           </div>
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
//             Mbande Investment Ltd
//           </h1>
//           <p className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-4">
//             SOARING TO NEW HEIGHTS
//           </p>
//           <p className="text-xl md:text-2xl text-white mb-8">
//             Electrical & General Contractors | IT Services
//           </p>
//           <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12">
//             Trusted KPLC contractor with decades of experience. Now expanding into innovative IT solutions.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={scrollToQuote}
//               className="btn-primary bg-yellow-500 text-primary hover:bg-yellow-400"
//             >
//               Request a Quote
//             </button>
//             <a
//               href="tel:+254722886751"
//               className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-primary"
//             >
//               Call Now: +254 722 886751
//             </a>
//           </div>
//         </div>

//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;