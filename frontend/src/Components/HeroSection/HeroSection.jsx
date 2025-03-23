import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative w-full flex items-center justify-center bg-cover bg-center overflow-auto h-[2500px]" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="absolute inset-0 bg-opacity-50"></div>
      
      <div className="relative z-10 text-center text-white px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1f6f78]">Welcome to Your AI-Powered Gmail Assistant</h1>
        <p className="mt-4 text-lg md:text-xl text-[#118a7e] max-w-2xl mx-auto">
          Manage your emails smarter, faster, and more efficiently with AI-driven features.
        </p>
        
        <Link to='/sign/in'>
        <button className="mt-6 px-6 py-3 bg-[#118a7e] hover:bg-[#1f6f78] text-black font-semibold text-lg rounded-lg shadow-md">
          Get Started
        </button>
        </Link>

      </div>
      

    </div>
  );
};

export default HeroSection;
