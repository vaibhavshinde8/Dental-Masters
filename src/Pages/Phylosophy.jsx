import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const philosophyContent = [
  {
    title: "Our Approach to Dental Care",
    description: `
      We are a family-focused dental practice that provides excellence in comprehensive 
      dental care while managing systemic medical conditions, oral health, and pathology 
      in each patient. We strive to treat patients as a whole person rather than tooth by tooth.
      Our team creates a comfortable and relaxed environment to reduce anxiety in every patient experience.
    `,
    image: "https://dentalmasters.in/assets/images/philosophy1.jpg",
  },
  {
    title: "The Examination Process",
    description: `
      The examination process is a key component of our practice. We feel every patient benefits 
      from understanding their current level of oral health, how any problems occurred, and understanding 
      the treatment options available to optimize their care. Our exams include thorough examination 
      of the teeth, gums, joints (TMJ), bite (occlusion), and soft tissues of the mouth (oral cancers).
    `,
    image: "https://dentalmasters.in/assets/images/philosophy2.jpg",
  },
  {
    title: "Preventive Dentistry",
    description: `
      We believe in preventive dentistry because we feel that prevention is the best way to control 
      both dental disease and the cost of dental care. We encourage our patients to come in regularly 
      for their cleanings and checkups so that problems can be noted earlier and treated with less 
      invasive techniques. We also use advanced technology like digital X-rays and intra-oral cameras 
      to provide comfortable diagnosis and treatments.
    `,
    image: "https://dentalmasters.in/assets/images/philosophy3.jpg",
  },
];

const OurPhilosophy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Our Philosophy</li>
        </ul>
      </div>
      <motion.h1
        className="text-4xl font-bold text-center text-blue-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Philosophy
      </motion.h1>

      {philosophyContent.map((section, index) => (
        <motion.div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8 mb-16`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is in viewport
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-900 leading-relaxed">
              {section.description}
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src={section.image}
              alt={section.title}
              className="rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OurPhilosophy;
