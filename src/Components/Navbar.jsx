import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/auth";

export default function Navbar() {
  const { state, logout } = useContext(AppContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [category, setCategory] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [newPatient, setNewPatient] = useState([]);
  const [hoveredPatient, setHoveredPatient] = useState(null);
  const [activePatient, setActivePatient] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Toggle dropdown visibility for mobile
  const handleDropdownToggle = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category); // Toggle category selection
  };

  const getServices = async () => {
    const response = await fetch(
      "https://dentalmasters.onrender.com/api/v1/service/categories"
    );
    const data = await response.json();
    // console.log(data.categories);
    setCategory(data.categories);
  };

  const groupedServices = services.reduce((acc, service) => {
    const { category, title, _id } = service;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ title, id: _id });
    return acc;
  }, {});

  const getAssociatedServices = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/service/all-services"
      );
      const data = await response.json();

      // Map over the services and pick only _id, category, and title
      const servicesData = data.services.map((service) => ({
        _id: service._id,
        category: service.category,
        title: service.title,
      }));

      // Set the services data in the state
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const getNewPatientData = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/data/getData"
      );
      const data = await response.json();
      console.log(data);
      // Map over the services and pick only _id, category, and title
      const newpatientData = data.data
        .filter((item) => item.category === "New Patient")
        .map((item) => ({
          _id: item._id,
          category: item.category,
          title: item.title,
        }));
      setNewPatient(newpatientData);
      console.log(newpatientData);
      // // Set the services data in the state
      // setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  // console.log(services);

  useEffect(() => {
    getServices();
    getAssociatedServices();
    getNewPatientData();
  }, []);

  return (
    <>
      <div className="h-14 w-full flex gap-4 bg-[#0F172A] px-4">
       
        <div className="flex items-center text-white gap-4 text-xl justify-end flex-auto">
          <a
            href=""
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a
            href=""
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a
            href=""
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href=""
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
      <div
        className="flex items-center justify-between py-4 px-6"
        style={{ background: "linear-gradient(to top, #ADCFEC, #ADCFEC)" }}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src="/Group 7@2x.png"
            alt="Logo"
            className="h-12 w-28 lg:h-16 lg:w-36 lg:ml-20"
          />
        </Link>

        {/* Navigation */}
        <nav>
          {/* Mobile Menu (Hamburger) */}
          <section className="lg:hidden fixed top-0 left-0 w-full bg-transparent z-50">
            <div
              className="space-y-2 top-20  right-5 float-right relative cursor-pointer"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
              className={`${
                isNavOpen ? "block" : "hidden"
              } absolute top-0 right-0 w-full h-screen bg-white z-20 text-gray-800 flex flex-col items-center justify-center space-y-8 border-t border-gray-400`}
            >
              <button
                className="absolute top-8 right-8 text-gray-600"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <ul className="space-y-8 text-xl">
                <li>
                  <Link to="/" className="uppercase">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(0)}
                      className="flex items-center uppercase"
                    >
                      <li className="hover:text-gray-800">About</li>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {dropdown === 0 && (
                      <ul className="absolute left-0 mt-2 text-base w-[250px] z-10 bg-white shadow-lg space-y-2 p-4">
                        <li>
                          <Link to="/about">
                            Professional (Dr.) Kapil Gandhi
                          </Link>
                        </li>
                        <li>
                          <Link to="/about/team">Our Dentist Team</Link>
                        </li>
                        <li>
                          <Link to="/about/philosophy">Our Philosophy</Link>
                        </li>
                        <li>
                          <Link to="/about/sets-us-apart">
                            What Sets Us Apart?
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>

                <li>
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(1)} // Trigger dropdown toggle
                      className="flex items-center uppercase"
                    >
                      <li className="hover:text-gray-800">Treatment</li>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Show categories when dropdown is open */}
                    {dropdown === 1 && (
                      <ul className="absolute left-0 text-base w-[189px] z-10 bg-white shadow-lg">
                        {/* Dynamically map over categories */}
                        {Object.keys(groupedServices).map((category, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleCategoryClick(category)} // Handle category click
                              className="text-lg w-full text-left p-2 hover:text-blue-500"
                            >
                              {category}
                            </button>

                            {/* Display associated services when a category is active */}
                            {activeCategory === category && (
                              <ul className="space-y-2 pl-4">
                                {groupedServices[category].map(
                                  (service, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        to={`/treatment/${category}/${service.id}`} // Route to service detail page
                                        className="text-sm hover:text-blue-600"
                                      >
                                        {service.title}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
                <li>
                  <div className="relative">
                    <li className="hover:text-gray-800">
                      {/* <button className="flex items-center hover:text-gray-800">
                        onClick={() => handleDropdownToggle(1)}
                        New Patient
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button> */}
                      <button
                        onClick={() => handleDropdownToggle(2)} // Trigger dropdown toggle
                        className="flex items-center uppercase"
                      >
                        <li className="hover:text-gray-800">New Patient</li>
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </li>
                    {dropdown === 2 && (
                      <ul className="absolute left-0 text-base w-[189px] z-10 bg-white shadow-lg">
                        {newPatient.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`/new-patient/${item.title}`} // You can create a dynamic route for each service
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
                <li>
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(3)}
                      className="flex items-center uppercase"
                    >
                      <li className="hover:text-gray-800">Our Practices</li>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {dropdown === 3 && (
                      <ul className="absolute left-0 mt-2 bg-white w-48 shadow-lg space-y-2 p-4">
                        <li>
                          <Link to="/our-practices/locations">
                            Process Flow
                          </Link>
                        </li>
                        <li>
                          <Link to="/services">Services</Link>
                        </li>
                        <li>
                          <Link to="/our-practices/services">Process Flow</Link>
                        </li>
                        <li>
                          <Link to="/our-practices/services">Process Flow</Link>
                        </li>
                        <li>
                          <Link to="/our-practices/services">Process Flow</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>

                <li>
                  <Link to="/contact-us" className="uppercase">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="uppercase">
                    Login
                  </Link>
                </li>
                {state.isLoggedIn && (
                  <li>
                    <Link to="/profile" className="uppercase">
                      Profile
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </section>

          {/* Desktop Menu */}
          <ul className="hidden items-center lg:flex space-x-8 text-gray-800 text-lg">
            <li>
              <Link to="/" className="hover:text-gray-800">
                Home
              </Link>
            </li>
            <li className="relative group">
              <li className="hover:text-gray-800">
                <button className="flex items-center hover:text-gray-800">
                  About
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </li>
              <ul className="absolute hidden group-hover:block text-normal left-0 w-64 bg-white shadow-lg space-y-2 p-4 z-10">
                <li>
                  <Link className="hover:text-blue-500" to="/about">
                    Professional (Dr.) Kapil Gandhi
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-500" to="/about/team">
                    Our Dentist Team
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-blue-500" to="/about/philosophy">
                    Our Philosophy
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-blue-500"
                    to="/about/sets-us-apart"
                  >
                    What Sets Us Apart?
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div className="relative group">
                <button className="flex items-center">
                  <li className="hover:text-gray-800">Treatment</li>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <ul className="absolute hidden group-hover:block left-0 text-lg w-[189px] z-10 bg-white shadow-lg space-y-2 p-3">
                  {/* Render the categories */}
                  {Object.keys(groupedServices).map((category, index) => (
                    <li key={index} className="relative">
                      {/* Hover effect on category */}
                      <div
                        className="relative"
                        onMouseEnter={() => setHoveredCategory(category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <Link
                          to={`/treatment/${category}`}
                          className="hover:text-blue-500"
                        >
                          {category}
                        </Link>

                        {/* Right dropdown for associated services */}
                        {hoveredCategory === category && (
                          <div className="absolute left-[160px] top-0 w-[200px] bg-white shadow-lg border p-4 opacity-0 transform translate-x-[20px] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
                            <ul className="space-y-2">
                              {/* Render associated services */}
                              {groupedServices[category].map(
                                (service, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="text-sm hover:text-blue-500"
                                  >
                                    <Link
                                      to={`/treatment/${category}/${service.id}`} // Route to the service's detailed page
                                      className="hover:text-blue-600"
                                    >
                                      {service.title}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* new patient */}

            <li className="relative group">
              <li className="hover:text-gray-800">
                <button className="flex items-center hover:text-gray-800">
                  New Patient
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </li>
              <ul className="absolute hidden group-hover:block text-normal left-0 w-64 bg-white shadow-lg space-y-2 p-4 z-10">
                {/* <li>
                <Link to="/examination">Examination and Registration</Link>
              </li>
              <li>
                <Link to="/payment">Payment Options</Link>
              </li>
              <li>
                <Link to="/financing">Financing Options</Link>
              </li>
              <li>
                <Link to="/patient-comfort">Patient comfort</Link>
              </li>
              <li>
                <Link to="/your-first-visit">Your first Visit</Link>
              </li>
              <li>
                <Link to="/acessibility">Accessibility</Link>
              </li> */}
                {newPatient.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/new-patient/${item.title}`} // You can create a dynamic route for each service
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="relative group">
                <button className="flex items-center">
                  <li className="hover:text-gray-800">Our Practices</li>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <ul className="absolute hidden group-hover:block left-0 mt-[-2] bg-white w-40 shadow-lg space-y-2 p-4 z-10">
                  <li>
                    <Link to="/ourteam">Our Team</Link>
                  </li>
                  <li>
                    <Link to="/our-practices/approach">Our Approach</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/our-practices/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link to="/our-practices/locations">Locations</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="bg-black text-white px-4 py-1 ho rounded-full">
              <Link to="/contact-us" className="">
                Contact
              </Link>
            </li>
            {state.isLoggedIn ? (
              <li>
                <button
                  onClick={() => logout()}
                  className="bg-blue-400 py-1 rounded-full px-4"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <button className="bg-blue-400 py-1 rounded-full px-4">
                    Login
                  </button>
                </Link>
              </li>
            )}
            {state.isLoggedIn && (
              <li className="relative group">
                <Link to="/profile">
                  <button className="flex items-center hover:text-gray-800 space-x-2">
                    {/* Profile Icon - User Circle */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-800 bg-gray-200 p-2 rounded-full"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM12 14c-3.314 0-6 2.686-6 6h12c0-3.314-2.686-6-6-6z" />
                    </svg>
                    {/* <span className="text-lg">Profile</span> */}
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
