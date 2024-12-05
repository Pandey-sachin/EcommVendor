import React, { useState } from 'react';
import BannerControls from './BannerControls';
import BannerSlide from './BannerSlide';

const banners = [
  {
    title: "Winter Sale",
    description: "Up to 50% off on selected items",
    image: "https://img.freepik.com/free-photo/lovely-romantic-cute-redhead-woman-prepared-gift-valentines-day-wrapped-present-pink-pape_1258-132697.jpg?t=st=1733415124~exp=1733418724~hmac=730aed6274dc64e0928fa7ac5fa2a9d6d9211bc1e0054be15458631fff1834d8&w=1380"
  },
  {
    title: "New Arrivals",
    description: "Check out our latest collection",
    image: "https://img.freepik.com/free-vector/black-friday-sale-shopping-cart-banner-with-text-space_1017-28049.jpg?t=st=1733415473~exp=1733419073~hmac=e36aa8832d890f1cb027603f5b272530d618d2c536968dbfd88045cff085afec&w=1380"
  },
  {
    title: "Free Shipping",
    description: "On orders above ₹999",
    image: "https://img.freepik.com/free-psd/sales-template-design-banner_23-2149174597.jpg?t=st=1733415350~exp=1733418950~hmac=00b417aaba3322c823d7213fe9c9cbf2e93802caf0fa6c9fcbb4dfa70876d8a0&w=1380"
  }
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-[400px] overflow-hidden">
      <div 
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentBanner * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <BannerSlide key={index} {...banner} />
        ))}
      </div>
      <BannerControls onPrev={prevBanner} onNext={nextBanner} />
    </div>
  );
};

export default Banner;