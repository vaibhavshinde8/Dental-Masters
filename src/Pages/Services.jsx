import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const getallServices = async () => {
    try {

      
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/service/all-services"
      );
      const data = await response.json();

      const filteredServices = data.services.map((service) => ({
        _id: service._id,
        category: service.category,
        title: service.title,
        imageUrl: service.imageUrl,
      }));

      setServices(filteredServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getallServices();
  }, []);

  const loadMoreServices = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleServices((prevVisible) => prevVisible + 6);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Section introducing the services */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          Our Services
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Discover a wide range of dental services designed to cater to your needs. Whether you're looking for cosmetic treatments, preventative care, or specialized procedures, we have something for everyone. Browse through our services and take the first step towards a healthier, more confident smile.
        </p>
      </div>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-20">
        {services.slice(0, visibleServices).map((service) => (
          <div
            key={service._id}
            className="relative bg-black overflow-hidden shadow-lg"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transform group-hover:scale-110 transition-all duration-500 ease-in-out"
              style={{ backgroundImage: `url(${service.imageUrl})` }}
            ></div>

            <div className="relative z-10 p-6 flex flex-col justify-between h-80 group">
              <h3 className="text-2xl text-center top-24 relative font-semibold text-white mb-2">
                {service.title}
              </h3>

              <Link
                to={`/treatment/${service.category}/${service._id}`}
                className="text-lg text-transparent group-hover:text-blue-600 group-hover:block hidden group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-4 transition-all duration-500"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleServices < services.length && (
        <div className="w-full text-center mt-6">
          <button
            onClick={loadMoreServices}
            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
