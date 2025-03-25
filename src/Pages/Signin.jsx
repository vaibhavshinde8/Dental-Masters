import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/auth";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "An error occurred during login");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row">
      {/* Left side - Image */}

      {/* Right side - Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="xl:mx-auto xl:w-full  p-4 xl:max-w-sm 2xl:max-w-md">
          <img
            src="/Group 7@2x.png"
            className="hidden lg:block lg:h-20"
            alt=""
          />
          <h2 className="text-start text-3xl mt-10 lg:text-5xl lg:mt-10 font-normal leading-tight text-black ">
            Lets Brighten <br /> Our Smile.
          </h2>
          <p className="mt-2 text-start text-sm text-gray-600">
            Welcome back! Please login to your account.
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email id"
                    className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit Button */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className={`inline-flex w-1/4 items-center justify-center rounded-full px-3.5 py-2.5 font-semibold leading-7 text-white ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md text-white"></span>
                  ) : (
                    "Login"
                  )}
                </button>
                <Link
                  className="lg:w-1/4 ml-5  text-blue-900 border-blue-900 border-2 p-3 text-center rounded-full"
                  to="/signup"
                >
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
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

export default Signin;
