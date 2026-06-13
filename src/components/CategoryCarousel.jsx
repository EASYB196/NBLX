import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../data/CategoriesData.js";

const CategoryCarousel = () => {
    

    const duplicatedImages = [...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images];

    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % duplicatedImages.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [duplicatedImages.length]);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev - 1 + duplicatedImages.length) % duplicatedImages.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % duplicatedImages.length);
    };

    return (
        <div className="w-full bg-black text-white py-10 px-5 md:px-0 flex flex-col gap-10 items-center overflow-hidden">
            <h2 className="text-3xl text-white font-bold mb-6">Shop by Category</h2>
            <div className="w-full max-w-6xl overflow-hidden relative">
                <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
                    aria-live="polite"
                >
                    {duplicatedImages.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-[33.33%] flex justify-center items-center relative"
                            style={{
                                transform: `scale(${index === activeIndex ? 1 : 0.8})`, 
                                opacity: index === activeIndex ? 1 : index === activeIndex + 1 || index === activeIndex + 2 ? 0.7 : 0, 
                                
                                zIndex: index === activeIndex ? 10 : 1, 
                                transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                            }}
                        >
                            <div
                                className="cursor-pointer flex flex-col items-center"
                                onClick={() => navigate(item.link)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && navigate(item.link)}
                                aria-label={`Go to ${item.title} category`}
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-50 md:w-100 h-30 md:h-100  object-cover rounded-full mb-4"
                                    loading="lazy"
                                />
                                <p className="text-center text-white text-2xl font-bold">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
                <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    aria-label="Previous"
                >
                    &larr; 
                </button>
                <div className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                    {(activeIndex % images.length) + 1} / {images.length}
                </div>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    aria-label="Next"
                >
                    &rarr; 
                </button>
            </div>
        </div>
    );
};

export default CategoryCarousel;