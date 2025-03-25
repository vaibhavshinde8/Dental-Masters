import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Treatment = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { category, id } = useParams();
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
  const [services, setServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);

  // Helper function to format the description
  const formatDescription = (description) => {
    if (!description) return "";

    // Split the description into sentences based on multiple full stops (3 or more)
    const paragraphs = [];
    const sentenceChunks = description.split(/(?<=\.)\s+(?=[A-Z])/); // Split at sentence boundaries

    // Track lines before breaking paragraphs
    let currentParagraph = [];
    sentenceChunks.forEach((sentence, index) => {
      currentParagraph.push(sentence.trim());

      // Break paragraph after 3-4 sentences (based on the full stops)
      if (currentParagraph.length >= 4 || index === sentenceChunks.length - 1) {
        // Detect and highlight specific keywords like 'advantage', 'disadvantage', and questions
        const formattedParagraph = currentParagraph
          .map((line, lineIndex) => {
            let formattedLine = line;

            // Highlight advantages and disadvantages
            formattedLine = formattedLine.replace(
              /\b(advantage|disadvantage)\b/gi,
              (match) => {
                return `<span class="font-semibold text-green-500">${match}</span>`;
              }
            );

            // Highlight questions and make their text larger
            if (/\b(?:what|how|why|where)\b[\s\S]*\?/gi.test(formattedLine)) {
              formattedLine = `<p class="text-xl mb-4 text-blue-500 font-semibold">${formattedLine}</p>`;
            } else {
              formattedLine = `<p class="mb-4">${formattedLine}</p>`;
            }

            return formattedLine;
          })
          .join("");

        paragraphs.push(
          <div dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
        );

        // Reset current paragraph for next section
        currentParagraph = [];
      }
    });

    return paragraphs;
  };

  // Fetch service by ID
  const getServiceById = async (serviceId) => {
    try {
      const response = await fetch(
        `https://dentalmasters.onrender.com/api/v1/service/get-service/${serviceId}`
      );
      const data = await response.json();
      setServiceDetails({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.error("Error fetching service by ID:", error);
    }
  };

  // Fetch all services
  const getAllServices = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/service/all-services"
      );
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getAllServices();
    if (id) getServiceById(id);
  }, [id]);

  const filteredServices = services.filter(
    (service) => service.category === category
  );

  const selectedService = services.find(
    (service) => service.title === selectedServiceTitle
  );
  useEffect(() => {
    const filtered = services.filter(
      (service) => service.category === category
    );
    if (filtered.length > 0 && !selectedServiceTitle) {
      setSelectedServiceTitle(filtered[0].title);
    }
  }, [services, category, selectedServiceTitle]);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm lg:px-28 px-4 text-gray-800">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/services`}>Treatment</Link>
          </li>
          <li>{category}</li>
          <li>{selectedServiceTitle ? selectedServiceTitle : null}</li>
        </ul>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:p-6 lg:px-40">
        {/* Left Sidebar */}
        <div className="hidden lg:block bg-gray-100 p-4 rounded shadow sticky top-4 h-max w-3/4 text-gray-800">
          <h2 className="text-lg font-semibold mb-4">{category}</h2>
          <ul className="space-y-2">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <li
                  key={service._id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedServiceTitle === service.title
                      ? "text-blue-500"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => setSelectedServiceTitle(service.title)}
                >
                  {service.title}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No services available</li>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded lg:w-[700px] lg:pl-4 lg:pb-7">
          {/* Header */}
          <div className="flex items-center justify-between px-4">
            <h1 className="lg:text-3xl text-xl lg:pb-8 pb-4 font-bold text-blue-500 font-cabin">
              {selectedService
                ? selectedService.title
                : serviceDetails
                ? serviceDetails.title
                : "Select a Service"}
            </h1>
            <i
              style={{ color: "#1c71d8" }}
              className="fa-solid fa-filter lg:hidden fa-xl cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            ></i>
          </div>

          {/* Mobile Filter */}
          {isFilterOpen && (
            <div className="bg-gray-100 p-4 rounded absolute left-36 shadow lg:hidden">
              <ul className="space-y-2">
                {filteredServices.map((service) => (
                  <li
                    key={service._id}
                    onClick={() => setSelectedServiceTitle(service.title)}
                    className="p-2 bg-blue-100 rounded text-gray-800 hover:bg-blue-200 cursor-pointer"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic Content */}
          {selectedService ? (
            <div>
              {/* Image */}
              <img
                src={
                  selectedService.imageUrl || "https://via.placeholder.com/300"
                }
                alt={selectedService.title}
                className="lg:w-3/4 lg:h-[320px] w-[300px] ml-5 rounded mb-4"
              />
              {/* Description */}
              <div className="text-gray-800 text-justify px-4">
                {formatDescription(selectedService.description)}
              </div>
            </div>
          ) : serviceDetails ? (
            <div>
              {/* Image */}
              <img
                src={
                  serviceDetails.imageUrl || "https://via.placeholder.com/300"
                }
                alt="Service"
                className="lg:w-3/4 lg:h-[320px] w-[300px] ml-5 rounded mb-4"
              />
              {/* Description */}
              <div className="text-gray-800 text-justify px-4">
                {formatDescription(serviceDetails.description)}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 px-4">
              Please select a service to view its details.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Treatment;
