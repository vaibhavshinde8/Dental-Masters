import React from "react";
import {Link} from "react-router-dom"

// Data array containing title, content, and image path
const sections = [
  {
    title: "What sets your dental masters family apart from the rest?",
    content: `At Dental Masters, we love what we do, we care about our patients, and we maintain a very comfortable and relaxed environment. Our goal is for every patient to leave with a smile on their face!`,
    image: "https://dentalmasters.in/assets/images/apart1.jpg",

    
  },


  {
    title: "ALL YOUR DENTAL TREATMENTS UNDER ONE ROOF!",
    content: `At Dental Masters, we save time & money for the patient by offering all treatments in one location. We can accommodate multiple patients at a time and have specialists for orthodontics, gum disease treatment, cosmetic, kids dentistry, root canal treatments, implants, general dentistry, aligners, and maxillofacial surgery.`,
    image: "https://dentalmasters.in/assets/images/apart2.jpg",
  },
  {
    title: "WE SPEND QUALITY TIME WITH OUR PATIENTS",
    content: `At Dental Masters, every patient is given a prior appointment of approximately 30-45 minutes for checkups and treatments. We don't rush through evaluations and assessments because we believe it's important to keep your mouth healthy.`,
    image: "https://dentalmasters.in/assets/images/apart3.jpg",
  },
  {
    title: "WE MAKE DENTISTRY PAINLESS AND COMFORTABLE",
    content: `We want our patients to make informed decisions about their oral health. Our patients know exactly which treatment is being performed, and we educate them (or their parents) about the treatment or any alternative options.`,
    image: "https://dentalmasters.in/assets/images/apart4.jpg",
  },
];

const SetsApart = () => {
  return (
    <div className="sets-apart-container">
      <div className="breadcrumbs text-sm lg:px-20 lg:mt-5 text-black">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>What Sets Us Apart</li>
        </ul>
      </div>
      <h1 className="text-center text-3xl font-bold my-6 text-blue-800">
        What Sets Us Apart
      </h1>

      {sections.map((section, index) => (
        <div key={index} className="section my-8">
          <div className="flex flex-col md:flex-col items-center">
            {/* Text content */}
            <div className="text-content md:w-3/4 p-4">
              <h2 className="text-2xl font-semibold text-black mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-gray-700">{section.content}</p>
            </div>

            {/* Image */}
            <div className="image md:w-1/2 p-4">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SetsApart;
