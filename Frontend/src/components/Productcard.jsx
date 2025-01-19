import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const ProductCard = () => {
  // Sample banner data - in real app, this would come from props or API
  const banners = [
    {
      id: 1,
      imageUrl: "/api/placeholder/1200/300",
      alt: "Special Sale Banner",
      title: "End of Season Sale",
      link: "/sale"
    },
    {
      id: 2,
      imageUrl: "/api/placeholder/1200/300",
      alt: "Electronics Deals",
      title: "Top Electronics Deals",
      link: "/electronics"
    },
    {
      id: 3,
      imageUrl: "/api/placeholder/1200/300",
      alt: "Fashion Collection",
      title: "New Fashion Collection",
      link: "/fashion"
    },
    {
      id: 4,
      imageUrl: "/api/placeholder/1200/300",
      alt: "Home Appliances",
      title: "Home Appliances Sale",
      link: "/appliances"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="bg-gray-200 py-6">
      <div className="max-w-[1250px] mx-auto relative group">
        {/* Main Banner */}
        <div className="relative h-[300px] overflow-hidden rounded-lg shadow-xl">
          {/* Banner Images */}
          <div 
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="min-w-full h-full relative"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Banner Title */}
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;