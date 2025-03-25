import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AppContext } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Hero = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(AppContext);

  const navigate = useNavigate();
  // console.log(state);

  const fetchHeroData = async () => {
    try {
      const storedTitle = localStorage.getItem("heroTitle");
      const storedDescription = localStorage.getItem("heroDescription");

      // Check if data already exists in localStorage
      if (storedTitle && storedDescription) {
        setTitle(storedTitle);
        setDescription(storedDescription);
        setIsLoading(false); // Stop loading
        return;
      }

      // Fetch data from API if not in localStorage
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/data/getDataById/677251244cb97504a176016a"
      );
      const responseData = await response.json();

      // Check if the data exists and if the category matches "main-page"
      if (responseData?.data?.category === "main-page") {
        const { title, description } = responseData.data;
        setTitle(title);
        setDescription(description);

        // Save to localStorage
        localStorage.setItem("heroTitle", title);
        localStorage.setItem("heroDescription", description);
      } else {
        console.log("No matching data for the category 'main-page'");
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner after data is fetched
    }
  };

  const handleNavigate = () => {
    if (state.isLoggedIn) {
      navigate("/book-appointment");
    } else {
      toast.warning("please login first");
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  return (
    <>
      <div
        className="bg-blue-100 pb-10 lg:pb-0 px-2 lg:px-12 flex flex-row md:flex-row items-center"
        style={{
          background: "linear-gradient(to top, #297CC0, #ADCFEC)", // Gradient from dark blue to light blue
        }}
      >
        {/* Text Section */}
        <div className="w-1/2 lg:w-[40%] pt-4 lg:ml-16 md:w-1/2 text-start">
          {isLoading ? (
            <h1 className="text-xl md:text-5xl font-medium text-black leading-tight mb-4">
              Loading...
            </h1>
          ) : (
            <h1 className="text-xl md:text-5xl font-medium text-black leading-tight mb-4">
              <span className="text-base text-blue-800 lg:text-4xl font-medium">
                {title || "Default Title"}
              </span>
              <br />
              {description || "Default Description"}
            </h1>
          )}

          <button
            className="bg-blue-900 text-white p-3 rounded-full"
            onClick={handleNavigate}
          >
            Book an appointment
          </button>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 md:w-1/2 mt-6  md:mt-0 justify-center md:justify-end">
          <img
            src="/hero.svg"
            className="h-[350px] w-[500px] relative top-1"
            alt=""
          />
        </div>
        <div className="lg:hidden relative  w-1/2 md:w-1/2 mt-6 lg:pt-12 md:mt-0 flex justify-center md:justify-end">
          <motion.img
            src="/Asset 1 1.png"
            alt="Dental Care"
            className="w-3/4 lg:w-1/2 md:w-full h-auto  "
          />
        </div>
      </div>
      <div>
        <div className=" md:px-16 flex flex-col  text-sm   lg:text-lg my-6  ">
          <div className="h-[10%]">
            <motion.h1
              className="text-center lg:text-2xl bg-blue-200  w-[40%] md:w-[30%] text-gray-800  lg:font-bold rounded-lg mt-4 m-auto p-2 "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              We Welcome You
            </motion.h1>
          </div>

          <div className="h-[90%] flex flex-col  lg:flex-row-reverse ">
            <div className="w-full lg:w-[50%] px-0 py-4">
              <motion.img
                src="/homie.png"
                alt="dental image"
                className=" "
                initial={{ opacity: 0, x: -100 }} // Initial position (out of view)
                whileInView={{ opacity: 1, x: 0 }} // Final position (in view)
                viewport={{ once: true }} // Animation triggers only once
                transition={{ duration: 0.5 }} // Duration of the animation
              />
            </div>

            <div className="w-full flex items-center lg:w-[50%] md:px-0 px-4 py-4">
              <motion.div
                className="text-gray-800 text-start flex flex-col"
                initial={{ opacity: 0, x: 100 }} // Initial position (out of view)
                whileInView={{ opacity: 1, x: 0 }} // Final position (in view)
                viewport={{ once: true }} // Animation triggers only once
                transition={{ duration: 0.5 }}
              >
                <p className="lg:pr-20">
                  Comfort of our clients is our foremost priority, we aim for
                  the best treatment outcomes for our patients and offer quality
                  dental services at affordable pricing. Dental Masters is a
                  cluster of highly experienced specialists under leadership of
                  Professor Kapil Gandhi, who are masters of their respective
                  fields and adequately equipped with their skills to handle
                  most complex of the clinical challenges.
                </p>
                <p className="mt-3 lg:pr-20">
                  Our patients choose us primarily for offering an unparalleled
                  expertise under one roof and for being extremely transparent
                  in both process and pricing. During the elaborate counseling
                  sessions, a definitive treatment strategy is evolved and all
                  the details of the treatment plans and alternative plans are
                  discussed in detail with the patient. The team always has an
                  empathic approach and maintains a minimalistic approach
                  towards offered interventions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
