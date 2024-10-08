import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/hero-background.jpg')`, }}>
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Dream Job Today
        </h1>
        <p className="text-lg md:text-xl">
          Discover top opportunities and land the perfect role for your career growth.
        </p>
      </div>
    </div>
  );
};

export default Hero;
