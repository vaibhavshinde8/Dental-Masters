import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DentistTeam = () => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/doctor/getAllDoctors"
      );
      const data = await response.json();
      setDoctors(data); // Assume the API returns the array of doctors
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const breadcrumbVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        className="p-6 lg:px-20 bg-gray-100 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="breadcrumbs text-sm text-black"
          variants={breadcrumbVariants}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>Our dentist team</li>
          </ul>
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Dental Team
        </h1>

        <div className="space-y-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-4 md:p-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full md:w-60 h-auto rounded-md object-cover shadow-md"
                />
              </div>

              {/* Details Section */}
              <div className="text-center md:text-left flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {doctor.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Qualification:</span>{" "}
                  {doctor.qualification}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Experience:</span>{" "}
                  {doctor.experience} years
                </p>
                <div className="relative bg-gray-50 border border-gray-300 rounded-lg overflow-y-scroll h-48 p-4 shadow-inner">
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {doctor.about}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default DentistTeam;
