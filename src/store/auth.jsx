import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
    error: null,
  });

  // Function to decode JWT manually
  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Decode from Base64 URL
    const decodedPayload = JSON.parse(atob(base64)); // Decode from Base64 and parse as JSON
    return decodedPayload;
  };

  // Check for existing token on app load
  useEffect(() => {
    const token = Cookies.get("authToken"); // Retrieve token from cookies
    if (token) {
      try {
        const decodedToken = decodeJWT(token); // Decode the token
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          // If the token is valid, update state with user data
          setState({
            user: decodedToken,
            isLoggedIn: true,
            error: null,
          });
        } else {
          // Token is expired, remove it
          Cookies.remove("authToken");
          setState({ user: null, isLoggedIn: false, error: null });
        }
      } catch (error) {
        Cookies.remove("authToken"); // In case of an invalid token format
        setState({ user: null, isLoggedIn: false, error: "Invalid Token" });
      }
    }
  }, []); // Ensure this only runs once when the component is mounted

  // Effect for logging state whenever it changes
  useEffect(() => {
    // Store the entire state in cookies (except sensitive data like password)
    if (state.user && state.isLoggedIn) {
      Cookies.set("userState", JSON.stringify(state), { expires: 7 }); // Store the state in cookie
    }
  }, [state]);

  // Update user information
  const updateUser = (user) => {
    setState((prevState) => {
      const newState = { ...prevState, user, isLoggedIn: !!user };
      // Store updated state in cookie
      Cookies.set("userState", JSON.stringify(newState), { expires: 7 });

      return newState;
    });
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/auth/login",
        { email, password }
      );

      const { token } = response.data; // Assume the response contains a token
      if (token) {
        // Decode token to get user data
        const decodedToken = decodeJWT(token);

        // Store token in cookies
        Cookies.set("authToken", token, {
          expires: 7, // Token expires in 7 days
          secure: true, // Use HTTPS for security
          sameSite: "Strict", // CSRF protection
        });

        // Update state
        const newState = {
          user: decodedToken,
          isLoggedIn: true,
          error: null,
        };

        setState(newState);
        Cookies.set("userState", JSON.stringify(newState), { expires: 7 });

        // Navigate to the home page or desired route after successful login
        navigate("/");
        toast.success("Login successful");
      }
    } catch (err) {
      // If login fails, only show the error toast and update state with the error message
      console.log(err);
      const errorMessage = err.response?.data?.message || "Login failed";
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
      }));
      toast.error(errorMessage); // Show error message
    }
  };

  // Signup function
  const signup = async (name, email, password, role, phone) => {
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/auth/register",
        { name, email, password, role, phone }
      );
      const { token } = response.data;
      if (token) {
        // Decode token to get user data
        const decodedToken = decodeJWT(token);

        // Store token in cookies
        Cookies.set("authToken", token, {
          expires: 7, // Token expires in 7 days
          secure: true, // Use HTTPS for security
          sameSite: "Strict", // CSRF protection
        });

        // Update state
        const newState = {
          user: decodedToken,
          isLoggedIn: true,
          phone: phone,
          error: null,
        };

        setState(newState);
        Cookies.set("userState", JSON.stringify(newState), { expires: 7 });
      }
    } catch (err) {
      setState({
        ...state,
        error: err.response?.data?.message || "Signup failed",
      });
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("authToken"); // Remove token from cookies
    Cookies.remove("userState"); // Remove user state from cookies
    setState({ user: null, isLoggedIn: false, error: null });
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppContext.Provider value={{ state, updateUser, login, signup, logout }}>
      {children}
    </AppContext.Provider>
  );
};
