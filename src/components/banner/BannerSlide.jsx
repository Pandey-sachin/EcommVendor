import React from 'react';

const BannerSlide = ({ title, description, image }) => {
  return (
    <div className="min-w-full h-full relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;