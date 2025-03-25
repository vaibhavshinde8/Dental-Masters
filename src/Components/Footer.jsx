import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showTreatments, setShowTreatments] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);

  const getserviceCategories = async () => {
    const response = await fetch(
      "https://dentalmasters.onrender.com/api/v1/service/categories"
    );
    const data = await response.json();
    setServiceCategories(data.categories);
  };

  useEffect(() => {
    getserviceCategories();
  }, []);

  return (
    <>
      {/* Mobile View Footer */}
      <footer className="bg-black text-white px-4 py-8 lg:hidden">
        {/* Dropdowns */}
        <div>
          {/* Treatments Dropdown */}
          <div>
            <button
              className="flex justify-between items-center w-full py-2 text-lg border-b border-gray-600"
              onClick={() => setShowTreatments(!showTreatments)}
            >
              <span>Treatments</span>
              <span>{showTreatments ? "-" : "+"}</span>
            </button>
            {showTreatments && (
              <ul className="mt-2 space-y-1 text-sm pl-4">
                {serviceCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/treatment/${category}`}
                      className="hover:underline"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Links Dropdown */}
          <div className="mt-4">
            <button
              className="flex justify-between items-center w-full py-2 text-lg border-b border-gray-600"
              onClick={() => setShowQuickLinks(!showQuickLinks)}
            >
              <span>Quick Links</span>
              <span>{showQuickLinks ? "-" : "+"}</span>
            </button>
            {showQuickLinks && (
              <ul className="mt-2 space-y-1 text-sm pl-4">
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-8">
          <p className="text-sm mb-4 text-center">Follow us on</p>
          <div className="flex justify-center space-x-4 text-2xl">
            <a
              href=""
              className="hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href=""
              className="hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href=""
              className="hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href=""
              className="hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Address */}
        

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>
            Copyright © 2024{" "}
            <span className="text-blue-500">Dental Masters</span>. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Desktop View Footer */}
      <footer className="hidden lg:grid grid-cols-3 p-10 px-20 bg-black text-white">
        <div>
          <p className="text-blue-500 text-2xl pb-3">Treatments</p>
          {serviceCategories.map((category, index) => (
            <Link key={index} to={`/treatment/${category}`}>
              <p className="hover:underline">{category}</p>
            </Link>
          ))}
        </div>
        <div>
          <p className="text-blue-500 text-2xl pb-3">Quick Links</p>
          <Link to="/">
            <p className="hover:underline">Home</p>
          </Link>
          <Link to="/about">
            <p className="hover:underline">About</p>
          </Link>
          <Link to="/new-patient">
            <p className="hover:underline">New Patients</p>
          </Link>
          <Link to="/our-practices">
            <p className="hover:underline">Our Practice</p>
          </Link>
          <Link to="/contact-us">
            <p className="hover:underline">Contact Us</p>
          </Link>
          <Link to="/terms-and-conditions">
            <p className="hover:underline">Terms & Conditions</p>
          </Link>
          <Link to="/privacy-policy">
            <p className="hover:underline">Privacy Policy</p>
          </Link>
        </div>
        <div>
          <div className="flex items-center gap-4 pt-5">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-button">
                <button className="relative w-12 h-12 rounded-full group">
                  <div className="floater w-full h-full absolute top-0 left-0 bg-pink-700 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
                  <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-pink-700 rounded-full">
                    <i className="fa-brands fa-xl fa-instagram"></i>
                  </div>
                </button>
              </div>
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-button">
                <button className="relative w-12 h-12 rounded-full group">
                  <div className="floater w-full h-full absolute top-0 left-0 bg-blue-600 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
                  <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-600 rounded-full">
                    <i className="fa-brands fa-xl fa-facebook"></i>
                  </div>
                </button>
              </div>
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-button">
                <button className="relative w-12 h-12 rounded-full group">
                  <div className="floater w-full h-full absolute top-0 left-0 bg-blue-800 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
                  <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                    <i className="fa-brands fa-xl fa-linkedin"></i>
                  </div>
                </button>
              </div>
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-button">
                <button className="relative w-12 h-12 rounded-full group">
                  <div className="floater w-full h-full absolute top-0 left-0 bg-blue-800 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"></div>
                  <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-400 rounded-full">
                    <i className="fa-brands fa-twitter fa-xl"></i>
                  </div>
                </button>
              </div>
            </a>
          </div>
        </div>
      </footer>
      <div className="hidden lg:block bg-black text-white text-center p-4">
        <i className="fa-solid fa-location-dot"></i>
        
        
      </div>

    </>
  );
}
