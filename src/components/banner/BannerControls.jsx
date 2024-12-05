import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerControls = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        aria-label="Next banner"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
};

export default BannerControls;