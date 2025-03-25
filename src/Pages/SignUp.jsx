import React, { useState, useContext } from "react";
import { AppContext } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // Default role
    phone: "",
  });

  const navigate = useNavigate();

  const { signup } = useContext(AppContext);

  // Validation function
  const validateInputs = () => {
    if (
      !response.name ||
      !response.email ||
      !response.password ||
      !response.phone
    ) {
      setError("Please enter all fields");
      return false;
    }

    // Validate name - should not contain numbers
    if (/\d/.test(response.name)) {
      setError("Name should not contain numbers");
      return false;
    }

    // Validate phone - should be exactly 10 digits and contain only numbers
    if (response.phone.length !== 10 || !/^\d+$/.test(response.phone)) {
      setError("Phone number must be exactly 10 digits and contain only numbers");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Run validation before proceeding
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signup(
        response.name,
        response.email,
        response.password,
        response.role,
        response.phone
      );
      toast.success("Signup successful!");
      navigate("/login")
    } catch (err) {
      setError(err.message || "An error occurred during signup");
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers in the phone number field
    if (/^\d*$/.test(value)) {
      setResponse({ ...response, phone: value });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <section className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="xl:mx-auto xl:w-full p-4 xl:max-w-sm 2xl:max-w-md flex-grow">
          <img
            src="/Group 7@2x.png"
            className="hidden lg:block lg:h-20 lg:mt-10"
            alt=""
          />
          <h2 className="text-start text-3xl lg:text-5xl lg:mt-10 mt-10 font-normal leading-tight text-black">
            Let's Brighten <br /> Our Smile.
          </h2>
          <p className="mt-2 text-start text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Full Name Input */}
              <div>
                <input
                  placeholder="Full Name"
                  type="text"
                  className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  value={response.name}
                  onChange={(e) =>
                    setResponse({ ...response, name: e.target.value })
                  }
                />
              </div>
              {/* Email Input */}
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  value={response.email}
                  onChange={(e) =>
                    setResponse({ ...response, email: e.target.value })
                  }
                />
              </div>
              {/* Phone Input */}
              <div>
                <input
                  placeholder="Phone Number"
                  type="tel"
                  className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  value={response.phone}
                  onChange={handlePhoneChange}
                />
              </div>
              {/* Password Input */}
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  value={response.password}
                  onChange={(e) =>
                    setResponse({ ...response, password: e.target.value })
                  }
                />
              </div>
              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {/* Submit Button */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className={`inline-flex lg:w-1/4 items-center justify-center rounded-full px-3.5 py-2.5 font-semibold leading-7 text-white ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md text-white"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-cover bg-center hidden lg:block bg-blue-200">
        <ul className="flex w-full text-black font-normal text-lg justify-evenly mt-20">
          {/* {["Home", "About", "Contact Us"].map((item, index) => (
            <li key={index} className="relative group cursor-pointer">
              <Link
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/ /g, "-")}`
                }
                className="relative group"
                activeClassName="text-blue-500"
              >
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))} */}
        </ul>

        <img src="/Auth.png" className="w-1/2 mx-auto mt-20" alt="" />
      </div>
    </div>
  );
};

export default SignUp;
