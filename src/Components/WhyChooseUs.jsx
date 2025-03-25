import React, { useEffect, useState } from "react";

const WhyChooseUs = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getFeedback = async () => {
    const response = await fetch(
      "https://dentalmasters.onrender.com/api/v1/feedback/all"
    );
    const data = await response.json();

    const updatedFeedback = await Promise.all(
      data.map(async (item) => {
        const userResponse = await fetch(
          `https://dentalmasters.onrender.com/api/v1/user/${item.userId}`
        );
        const userData = await userResponse.json();
        console.log(userData)
        return {
          userId: userData.name || "User", 
          comments: item.comments,
          rating: item.rating,
          createdAt: item.createdAt,
        };
      })
    );
  
    setTestimonials(updatedFeedback);

    // Extract only the required fields
    // const filteredFeedback = data.map((item) => ({
    //   userId: item.userId,
    //   comments: item.comments, // Using 'reply' if 'comments' is not available
    //   rating: item.rating,
    //   createdAt: item.createdAt,
    // }));

    // setTestimonials(filteredFeedback);
  };

  // console.log(testimonials);

  useEffect(() => {
    getFeedback();
  }, []);

  // const testimonials = [
  //   {
  //     text: "I walked into Dental Masters without an appointment and was pleasantly surprised to secure a swift appointment for 2 sittings of descaling and filing, all completed within 24 hours. The clinic boasts a pleasingly clean interior, and Dr. Kapil Gandhi's expertise and attentiveness truly stood out. I must commend Payal, Sukanya, and Ashok for their invaluable assistance. Dr. Kapil Gandhi's skill shines through, as he meticulously tended to my dental needs over two sessions. What could have been a daunting experience was remarkably painless, thanks to his expertise. His clear and transparent explanations fostered a friendly and welcoming atmosphere throughout the procedures.",
  //     author: "Yousuf Mohammad",
  //     rating: 4,
  //   },
  //   {
  //     text: "Dental Masters is by far the best dental clinic I’ve ever been to. The staff is extremely professional and friendly, and Dr. Kapil Gandhi is a true expert in his field. The whole process, from consultation to treatment, was smooth and comfortable. I appreciated their focus on transparency and patient care. I would highly recommend Dental Masters to anyone looking for top-notch dental services.",
  //     author: "Ayesha Khan",
  //     rating: 5,
  //   },
  // ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Handle navigation
  const handleNext = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsSliding(false);
      }, 300); // Match the transition duration
    }
  };

  const handlePrev = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex - 1 + testimonials.length) % testimonials.length
        );
        setIsSliding(false);
      }, 300); // Match the transition duration
    }
  };
  return (
    <>
      <h1 className="text-center lg:text-start px-20 text-2xl font-semibold text-blue-950 pt-10 pb-3">
        Why Choose Us?
      </h1>
      <h1 className="text-center lg:text-start px-20 text-xl font-semibold text-blue-500">
        A dental care experience that provides you
      </h1>
      <div className="hidden lg:grid grid-cols-4 gap-4 w-full p-6 bg-white px-20 pr-40 pb-10">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">01</h1>
              <p className="text-start text-xs font-semibold">
                Unparalleled Experience
                <br />
                under one roof
              </p>
            </div>
            <img src="/wcu1.png" className="w-20 ml-4" alt="" />
          </div>
          <div className="flex flex-row  bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">02</h1>
              <p className="text-start text-xs font-semibold">
                Exceptional treatment
                <br />
                for all ages
              </p>
            </div>
            <img src="/wcu2.png" className="w-20 ml-6" alt="" />
          </div>
          <div className="flex flex-row bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">03</h1>
              <p className="text-start text-xs font-semibold">
                Highest
                <br />
                Quality Dentistry
              </p>
            </div>
            <img src="/wcu3.png" className="w-20 ml-12" alt="" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row  bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">04</h1>
              <p className="text-start text-xs font-semibold">
                Personalized care just
                <br />
                for you
              </p>
            </div>
            <img src="wcu4.png" className="w-16 ml-10" alt="" />
          </div>
          <div className="flex flex-row  bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">05</h1>
              <p className="text-start text-xs font-semibold">
                Transparent
                <br />
                pricing
              </p>
            </div>
            <img src="wcu5.png" className="w-20 ml-20" alt="" />
          </div>
          <div className="flex flex-row  w-[359px] h-[112px]  bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">06</h1>
              <p className="text-start text-xs font-semibold">
                Unparalleled Warranty
              </p>
            </div>
            <img src="wcu6.png" className="ml-16" alt="" />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-[180px] bg-blue-500 p-4 rounded-lg text-white row-span-2 h-full transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-7xl font-bold">07</h1>
              <p className="text-sm font-semibold">
                Affordable
                <br />
                treatment options
              </p>
            </div>
            <img src="wcu7.png" className="w-20 mt-5 ml-6" alt="" />
          </div>
          <div className="flex flex-row  ml-[90px] w-[380px]  bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">08</h1>
              <p className="text-start text-xs font-semibold">
                Greater Control Over
                <br />
                Your Treatment and Savings
              </p>
            </div>
            <img src="wcu8.png" className="w-20 ml-12 h-20" alt="" />
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 h-28 relative right-[86px] bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            {/* Left Section: Text Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl relative bottom-6 font-bold">09</h1>
              <p className="text-start relative bottom-6 left-1 text-xs font-semibold">
                Long-Term
                <br />
                Savings
              </p>
            </div>

            {/* Right Section: Images */}
            <div className="flex flex-col items-center">
              <img src="wcu9a.png" className="w-16" alt="First Image" />
              <img
                src="wcub.png"
                className="w-16 relative bottom-5"
                alt="Second Image"
              />
            </div>
          </div>

          <div className="flex flex-row   relative right-[86px] bg-blue-500 p-4 rounded-lg text-white transform transition-transform duration-300 hover:scale-105 col-span-2">
            <div>
              <h1 className="text-5xl font-bold">10</h1>
              <p className="text-start text-xs font-semibold">
                Unparalleled Post
                <br />
                Treatment Care
              </p>
            </div>
            <img src="wcu10.png" className="w-20 ml-12" alt="" />
          </div>
        </div>
      </div>
      <div className="lg:hidden ml-[68px] mt-5 carousel h-72 rounded-box w-64">
        {Array.from({ length: 10 }, (_, index) => (
          <div className="carousel-item  w-full" key={index}>
            <div className="bg-blue-500 p-4 text-white w-full h-full flex flex-col">
              <h1 className="text-8xl font-semibold">
                {String(index + 1).padStart(2, "0")}
              </h1>
              <p className="text-sm font-semibold text-start">
                {
                  [
                    "Unparalleled Experience under one roof",
                    "Exceptional treatment for all ages",
                    "Highest Quality Dentistry",
                    "Personalized care just for you",
                    "Transparent pricing",
                    "Unparalleled Warranty",
                    "Affordable treatment options",
                    "Greater Control Over Your Treatment and Savings",
                    "Long-Term Savings",
                    "Unparalleled Post Treatment Care",
                  ][index]
                }
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-100 mt-5 pt-5">
        <h1 className="lg:px-20 lg:text-3xl text-blue-950 text-3xl font-playfair pb-2 font-semibold px-5 mt-10">
          Our Clinic
        </h1>
        <h1 className="lg:px-20 lg:text-xl text-gray-800 font-playfair text-lg font-semibold px-5">
          Take a Virtual tour at our clinic
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 space-y-7 lg:gap-4 p-6 lg:px-20">
          <img src="/dentalGallery1.jpg.png" className="lg:mt-8" alt="1" />
          <img src="/dentalGallery2.jpg.png" alt="2" />
          <img src="/dentalGallery3.jpg.png" alt="3" />
        </div>
        <p className="text-center pb-8 text-black">
          <i className="fa-duotone fa-solid fa-clock"></i> Monday-Saturday -
          9:00 AM - 8:00 PM
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-10">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 font-playfair underline text-blue-900 text-center">
          What our patients have to say
        </h2>

        {/* Swiper Container */}
        <div className="carousel w-3/4 mt-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full"
            >
              <div className="w-full h-full p-6 px-24 bg-white border rounded-lg shadow-lg text-center sm:text-left">
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                  {testimonial.comments}
                </p>
                <div className="mt-4 flex flex-row justify-between">
                  <p className="font-semibold text-blue-800 font-cabin">
                    - {testimonial.userId}
                  </p>
                  <div className="flex justify-center sm:justify-start mt-2">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`#slide${index === 0 ? testimonials.length : index}`}
                  className="btn bg-transparent border-none btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${
                    index === testimonials.length - 1 ? 1 : index + 2
                  }`}
                  className="btn bg-transparent border-none btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
