import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contactus = () => {

  
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers in the phone field
      if (/^\d*$/.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name should not contain numbers.";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name should not contain numbers.";
    }

    if (formData.phone.length > 10) {
      newErrors.phone = "Phone number should not exceed 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const templateParams = {
      fullName: formData.fullName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send("service_xwgzey1", "template_nta0aib", templateParams, "Z17suYTec6wmDIA0q")
      .then(
        (result) => {
          console.log(result.text);
          setIsSubmitted(true);
          setFormData({
            fullName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="max-w-5xl w-full rounded-lg p-6 md:p-12 flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <div className="rounded-full lg:relative lg:top-20 lg:right-10 bg-blue-100 p-4">
              <img
                src="contact.png"
                alt="Contact Illustration"
                className="w-full max-w-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              We are here for your questions and suggestions. Feel free to
              Contact us.
            </p>
            {isSubmitted && (
              <div className="text-green-500 mb-4">Your message has been sent!</div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="col-span-2 w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
                className="col-span-2 w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
              ></textarea>
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
