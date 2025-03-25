import React, { useEffect, useState } from "react";

const OurTeam = () => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    const response = await fetch(
      "https://dentalmasters.onrender.com/api/v1/doctor/getAllDoctors"
    );
    const data = await response.json();
    console.log(data)
    const doctorsData = data.map((doctor) => ({
      id: doctor._id,
      name: doctor.name,
      imageUrl: doctor.imageUrl,
      qualification: doctor.qualification,
    }));

    setDoctors(doctorsData);
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div>
      <div className="w-full bg-blue-500 flex justify-center items-center relative">
        {/* Image with dark overlay */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/029/593/869/non_2x/modern-dental-office-setup-showcasing-equipment-background-with-empty-space-for-text-photo.jpg"
          className="w-full h-96 object-cover opacity-50"
          alt="Dental Office"
        />
        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        {/* Heading */}
        <h1 className="absolute text-white text-4xl font-semibold z-10">
          Our Dentist Team
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:px-28 pt-10">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="w-64 h-80 bg-white shadow-lg rounded-lg overflow-hidden relative group"
          >
            {/* Image */}
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Text */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-bold text-xl">{doctor.name}</h3>
              <p className="text-sm text-blue-600">{doctor.qualification}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
