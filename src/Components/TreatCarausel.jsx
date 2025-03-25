import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const TreatCarousel = () => {
  const [category, setCategory] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const getServices = async () => {
    try {
      // Check if treatments are already stored in localStorage
      const storedServices = localStorage.getItem("treatments");
      if (storedServices) {
        setTreatments(JSON.parse(storedServices)); // Use stored data
        setLoading(false); // Set loading to false as data is already fetched
      } else {
        // If no data in localStorage, fetch from API
        const response = await fetch(
          "https://dentalmasters.onrender.com/api/v1/service/all-services"
        );
        const jsonData = await response.json();

        // Filter services based on matching categories
        const filteredServices = jsonData.services
          .filter((service) => category.includes(service.category))
          .map((service) => ({
            title: service.title,
            imageUrl: service.imageUrl,
            category: service.category,
          }));

        // Group by category and pick the first service from each category
        const groupedServices = filteredServices.reduce((acc, service) => {
          if (!acc[service.category]) {
            acc[service.category] = service; // Add the first service of each category
          }
          return acc;
        }, {});

        // Convert the grouped services object into an array of values
        const finalServices = Object.values(groupedServices);

        // Store the fetched data in localStorage
        localStorage.setItem("treatments", JSON.stringify(finalServices));

        setTreatments(finalServices); // Set state with fetched data
        setLoading(false); // Set loading to false after fetching data
      }
    } catch (err) {
      console.error(err.message);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  const getCategory = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/service/categories"
      );
      const jsonData = await response.json();
      setCategory(jsonData.categories);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategory();
    getServices(); // Fetch services on mount
  }, [category]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === treatments.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? treatments.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="p-6 pb-12 lg:pb-0">
      {isMobile ? (
        // Mobile View: Carousel
        <div className="relative">
          <h1 className="text-2xl text-center text-gray-800 pb-6 font-semibold">
            Our Treatments
          </h1>
          <div className="carousel w-full px-10 h-80 space-x-4">
            {treatments.length > 0 && (
              <div className="carousel-item w-full">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                  <img
                    src={treatments[currentIndex].imageUrl}
                    alt={treatments[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for Text */}
                  <div className="absolute bottom-0 w-full bg-blue-900 bg-opacity-70 text-white p-4 text-center flex flex-row justify-between">
                    <h2 className="text-lg font-bold">
                      {treatments[currentIndex].title}
                    </h2>
                    <Link
                      to={`/treatment/${treatments[currentIndex].category}`}
                      className="hover:underline text-white hover:text-black"
                    >
                      <i className="fas fa-external-link-alt pt-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Left and Right Buttons */}
          <button
            className="absolute right-20 top-[400px] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            &#x276E;
          </button>
          <button
            className="absolute right-10 top-[400px] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            &#x276F;
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center px-20">
            <h1 className="text-3xl mb-7 text-gray-900 font-bold">
              Our Treatments
            </h1>
            <Link className="hover:underline text-gray-800 hover:text-black">
              View all treatments <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 px-20">
            {treatments.map((service, index) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={index}
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-blue-500 text-white flex flex-row justify-between">
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <Link
                    to={`/treatment/${service.category}`}
                    className="hover:underline text-white hover:text-black"
                  >
                    <i className="fas fa-external-link-alt pt-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TreatCarousel;
