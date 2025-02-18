import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DrKapilGandhi = () => {
  const [doctor, setDoctor] = useState(null);

  const getDoctorDetails = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/doctor/getDoctorByID/677d40ee86030882a3947755"
      );
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);



  // Split the `about` text into paragraphs
  const aboutParagraphs = doctor.about.split("\n\n");
  if (!doctor) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-gray-800 font-cabin pl-2 lg:px-20 lg:pt-10">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:px-20">
        {/* Image */}
        <div className="mx-auto w-[50%] lg:w-[60%] lg:h-[60%] lg:ml-28">
          <img src={doctor.imageUrl} alt={doctor.name} className="w-full" />
        </div>

        {/* Doctor Info */}
        <div className="lg:pt-14 lg:w-4/5">
          <h1 className="text-xl text-center pt-3 lg:text-start lg:text-5xl font-medium text-blue-500 font-cabin">
            Professor {doctor.name}
          </h1>
          <p className="lg:text-xl leading-7 px-4 lg:px-0 text-gray-800 font-cabin lg:leading-10 py-5 text-justify">
            {doctor.qualification} with {doctor.experience} years of clinical
            experience.
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="lg:px-40 px-4 lg:text-xl text-gray-800 font-cabin lg:pt-10">
        {aboutParagraphs.map((paragraph, index) => (
          <p key={index} className="lg:leading-10 leading-7 pt-6 text-justify">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Additional Information */}
      <div className="font-cabin lg:px-40 px-4 pt-6 lg:pt-10 text-gray-800">
        <h1 className="lg:text-3xl lg:pt-10 text-gray-900">EX BOARD MEMBER:</h1>
        <p className="lg:text-xl pt-4 lg:pt-6 leading-7 lg:leading-10 pb-7">
          National Indian Society of Pedodontics and Preventive Dentistry <br />
          Post Graduate Studies in Health University, Rohtak <br />
          In his spare time, he enjoys pursuing various hobbies, including
          photography, motorbiking, and traveling. He believes in maintaining a
          balanced lifestyle and finds joy in these activities outside of his
          professional work.
        </p>
      </div>
    </>
  );
};

export default DrKapilGandhi;
