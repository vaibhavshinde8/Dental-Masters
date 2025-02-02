import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/auth";
import { toast } from "react-toastify";

const Carousel = () => {
  const [doctors, setDoctors] = useState([]);



  
  const getAllDoctors = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/doctor/getAllDoctors"
      );
      const data = await response.json();
      console.log(data);

      // Extracting the required fields (_id, name, imageUrl, experience)
      const doctorsData = data.map((doctor) => ({
        _id: doctor._id,
        name: doctor.name,
        imageUrl: doctor.imageUrl,
        experience: doctor.experience,
        qualification: doctor.qualification,
      }));

      setDoctors(doctorsData); // Setting the filtered data in the state
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(2); // Middle index for the focused item

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? doctors.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === doctors.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleNavigate = () => {
    if (state.isLoggedIn) {
      navigate("/book-appointment");
    } else {
      toast.warning("Please log in first.");
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    // Mobile view using DaisyUI carousel
    return (
      <section className="bg-blue-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-playfair text-gray-800 mb-8">
            Our Experienced Team For Your Smile
          </h2>
          <div className="carousel carousel-center w-full bg-white rounded-box max-w-md space-x-4 p-4 mx-auto">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                className="carousel-item"
                initial={{ opacity: 0, y: 50 }} // Start from below with no opacity
                whileInView={{ opacity: 1, y: 0 }} // Fade in and move up
                viewport={{ once: true }} // Animation happens only once
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
              >
                <div className="bg-white rounded-lg text-center p-4">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg text-black font-bold">
                    {doctor.name}
                  </h3>
                  <span>{doctor.qualification}</span>
                  <p className="text-sm text-gray-600">
                    {doctor.experience} year experience
                  </p>
                  <div className="text-center mt-8">
                    <button
                      className="bg-blue-800 text-white py-2 px-6 rounded-full text-lg shadow-md hover:bg-blue-600 transition"
                      onClick={handleNavigate}
                    >
                      Book an appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default carousel for larger screens
  return (
    <>
      <div className="bg-blue-100">
        <h1 className="hidden lg:block text-3xl font-playfair font-semibold text-black p-8 pl-24">
          Our Experienced Team For Your Smile
        </h1>
        <div className="relative p-8 px-20">
          <div className="flex justify-center items-center gap-4">
            {doctors.map((doctor, index) => {
              const isMainFocus = index === currentIndex;
              return (
                <div
                  key={doctor._id}
                  className={`transition-all duration-500 bg-[#3a6ff8] rounded-lg overflow-hidden ease-in-out ${
                    isMainFocus ? "scale-110 z-10" : "scale-75 opacity-60"
                  }`}
                >
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-full"
                  />
                  <div className="p-2">
                  <p className="text-white text-center pt-3">{doctor.name}</p>
                  <p className="text-white text-sm text-center pt-2">
                    {doctor.experience} year experience
                  </p>
                  </div>

                  {/* Add the "Book an appointment" button only for the focused team member */}
                  {/* {isMainFocus && (
                    <div className="text-center mt-8">
                      <button
                        className="bg-white border-2 border-blue-700 text-blue-700 py-2 px-6 rounded-xl text-lg shadow-md hover:bg-blue-700 hover:text-white transition"
                        onClick={handleNavigate}
                      >
                        Book an appointment
                      </button>
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-x-5 justify-between items-center  flex pb-10 px-10">

          <div className=""></div>
          <div className="text-center mt-8">
            <button
              className="bg-white border-2 border-blue-700 translate-x-[3.3rem] text-blue-700 py-2 px-6 rounded-full text-lg shadow-md hover:bg-blue-700 hover:text-white transition"
              onClick={handleNavigate}
            >
              Book an appointment
            </button>
          </div>

          <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="bg-slate-900 text-white px-4 py-2 rounded-full"
          >
            <span>&larr;</span>
          </button>

          <button
            onClick={handleNext}
            className="bg-slate-900 text-white px-4 py-2 rounded-full"
          >
            <span>&rarr;</span>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
