import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const NewPatient = () => {
  const { title } = useParams(); // Get the service title from the URL params
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control the mobile filter

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
          .join(" ");

        paragraphs.push(
          <div dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
        );

        // Reset current paragraph for next section
        currentParagraph = [];
      }
    });

    return paragraphs;
  };

  // Fetch all services from the existing endpoint
  const getAllServices = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/data/getData"
      );
      const data = await response.json();
      const newPatientServices = data.data.filter(
        (item) => item.category === "New Patient"
      );
      setServices(newPatientServices || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch service based on title (from the services array)
  const getServiceByTitle = (serviceTitle) => {
    const service = services.find((service) => service.title === serviceTitle);
    setSelectedService(service);
  };

  useEffect(() => {
    // Fetch services and set the selected service when the title changes
    getAllServices();
  }, []);

  useEffect(() => {
    if (services.length > 0 && title) {
      // When services are loaded, find the service based on the title in the URL
      getServiceByTitle(decodeURIComponent(title));
    }
  }, [services, title]);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm lg:px-28 px-4 text-gray-800">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/new-patient`}>New Patient</Link>
          </li>
          <li>{selectedService ? selectedService.title : "Select an Option"}</li>
        </ul>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:p-6 lg:px-40">
        {/* Left Sidebar */}
        <div className="hidden lg:block bg-gray-100 p-4 rounded shadow sticky top-4 h-max w-3/4 text-gray-800">
          <h2 className="text-lg font-semibold mb-4">New Patient</h2>
          <ul className="space-y-2">
            {services.length > 0 ? (
              services.map((service) => (
                <li
                  key={service._id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedService && selectedService.title === service.title
                      ? "text-blue-500"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <Link to={`/new-patient/${encodeURIComponent(service.title)}`}>
                    {service.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options available</li>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded lg:w-[700px] lg:pl-4 lg:pb-7">
          {/* Header */}
          <div className="flex items-center justify-between px-4">
            <h1 className="lg:text-3xl text-xl lg:pb-8 pb-4 font-bold text-blue-500 font-cabin">
              {selectedService ? selectedService.title : "Select an option"}
            </h1>
            <i
              style={{ color: "#1c71d8" }}
              className="fa-solid fa-filter lg:hidden fa-xl cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle mobile filter
            ></i>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="bg-gray-100 p-4 rounded absolute left-36 shadow lg:hidden">
              <ul className="space-y-2">
                {services.map((service) => (
                  <li
                    key={service._id}
                    onClick={() => {
                      setSelectedService(service);
                      setIsFilterOpen(false); // Close filter after selection
                      navigate(`/new-patient/${encodeURIComponent(service.title)}`);
                    }}
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
                src={selectedService.imageUrl || "https://via.placeholder.com/300"}
                alt={selectedService.title}
                className="lg:w-3/4 lg:h-[320px] w-[300px] ml-5 rounded mb-4"
              />
              {/* Description */}
              <div className="text-gray-800 text-justify px-4">
                {formatDescription(selectedService.mainDescription)}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 px-4">
              Please select an option to view its details.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPatient;
