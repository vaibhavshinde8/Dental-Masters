import React, { useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "../store/auth";
import Cookies from "js-cookie";
import AppointmentStatus from "../Components/Appointstatus";

const Appointment = () => {
  const [patientId, setPatientId] = useState("");
  const [state, setState] = useState([]);
 

  useEffect(() => {
    const userState = Cookies.get("userState");
    if (userState) {
      const parsedState = JSON.parse(userState);
      setState(parsedState);
      setPatientId(parsedState.user.id);
    }
  }, []);

  useEffect(() => {
    // Update formData when patientId changes
    if (patientId) {
      setFormData((prevData) => ({
        ...prevData,
        patientId: patientId, // Update the patientId in formData
      }));
    }
  }, [patientId]); // Run whenever patientId change

  const navigate = useNavigate();
  const [RoomId, setRoomId] = useState("");
  const [feedback, setFeedback] = useState({
    userId: "",
    appointmentId: "",
    rating: "",
    comments: "",
  });

  const [services, setServices] = useState([]);

  const getallServices = async () => {
    const response = await fetch(
      "https://dentalmasters.onrender.com/api/v1/service/all-services"
    );
    const data = await response.json();
    const filteredServices = data.services.map((service) => ({
      service_id: service._id,
      title: service.title,
    }));

    setServices(filteredServices);
  };

  const [doctors, setDoctors] = useState([]);
  const getAllDoctors = async () => {
    try {
      const response = await fetch(
        "https://dentalmasters.onrender.com/api/v1/user/all-doctors"
      );
      const data = await response.json();

      // Extract only the _id and name from the data
      const doctorList = data.map((doctor) => ({
        _id: doctor._id,
        name: doctor.name,
      }));

      // Store the extracted data in state
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getallServices();
    getAllDoctors();
  }, []);

  const handleRoomJoin = useCallback(() => {
    if (state.user) {
      navigate(`/room/${RoomId}`);
    } else {
      alert("Please login to join the room");
    }
  }, [navigate, RoomId, state.user]);

  const [formData, setFormData] = useState({
    patientId: patientId,
    doctorId: "",
    date: "",
    serviceId: "",
    phone: "",
    reminderSent: false,
    notes: "",
    doctorName: "",
    patientName: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "date") {
      // Update the formData with the raw local datetime value for display
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === selectedDoctorId
    );
    setFormData({
      ...formData,
      doctorId: selectedDoctor._id, // Update doctor ID
      doctorName: selectedDoctor.name, // Update doctor name
    });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/feedback/create",
        feedback
      );
      alert("Feedback submitted successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to submit feedback.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const utcDate = new Date(formData.date).toISOString(); // Convert to UTC
    const formDataWithUTC = { ...formData, date: utcDate };

    setLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/appointment/create",
        formDataWithUTC
      );
      const appointmentId = response.data._id;
      const appointmentAmount = 1000; // Example amount in paisa
      handlePayment(appointmentId, appointmentAmount);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message ||
          "Failed to book appointment. appointment will be in pending"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const toLocalDateTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toISOString().slice(0, 16); // Returns 'YYYY-MM-DDTHH:mm'
  };

  // Example usage in state
  useEffect(() => {
    if (formData.date) {
      const localDate = toLocalDateTime(formData.date);
      setFormData((prevData) => ({ ...prevData, date: localDate }));
    }
  }, []);

  const handlePayment = async (appointmentId, amount) => {
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/payment/initiate",
        { amount, appointmentId }
      );
      if (response.data.success) {
        const options = {
          key: "rzp_test_xxxxxxxxxxxxxxxxxx", // Dummy key
          amount: response.data.amount,
          currency: "INR",
          name: "Dental Masters",
          description: "Booking Appointment",
          order_id: response.data.orderId,
          handler: (paymentResponse) =>
            handlePaymentVerification(paymentResponse, appointmentId),
          prefill: {
            name: formData.patientName,
            contact: formData.phone,
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      setResponseMessage("Failed to initiate payment.");
    }
  };

  const handlePaymentVerification = async (paymentResponse, appointmentId) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      paymentResponse;
    try {
      const response = await axios.post(
        "https://dentalmasters.onrender.com/api/v1/payment/verify",
        {
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        }
      );
      if (response.data.success) {
        setResponseMessage("Payment successful. Appointment booked!");
      } else {
        setResponseMessage("Payment verification failed.");
      }
    } catch (error) {
      setResponseMessage("Error verifying payment.");
    }
  };

  return (
    <>
      <div
        className="flex flex-row gap-6 p-8 bg-gray-100 min-h-screen"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/professional-dentist-tools-dental-office_1204-235.jpg')",
        }}
      >
        {/* Appointment Form */}
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Book an Appointment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient ID and Patient Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  placeholder="Patient Name"
                  className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 placeholder:text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Doctor ID and Doctor Name */}
            <div className="grid grid-cols-2 gap-4">
              {/* Doctor Name Dropdown */}
              <div>
                <select
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorId} // Use doctorId as value to reflect the selected doctor
                  onChange={handleDoctorSelect}
                  required
                  className="mt-1 block w-full p-2 bg-blue-100 border border-gray-300 placeholder:text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Name Display (Non-editable) */}
              <div>
                <input
                  id="doctorName"
                  name="doctorName"
                  type="text"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                  disabled // Doctor name will be automatically populated from the dropdown
                  placeholder="Doctor Name"
                  className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 placeholder:text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Service ID and Date */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="serviceId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Service
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {services.map((service) => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <input
                id="date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone"
                className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 placeholder:text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Notes */}
            <div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="mt-1 block w-full p-2 bg-blue-100 border text-black border-gray-300 placeholder:text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Send Reminder */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="reminderSent"
                checked={formData.reminderSent}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Send Reminder
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span>Booking...</span>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Book Appointment"
              )}
            </button>
          </form>
          {responseMessage && (
            <div
              className={`mt-4 text-center ${
                responseMessage.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center items-center mt-10">
            <form
              onSubmit={handleFeedbackSubmit}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Submit Your Feedback
              </h2>

              <div className="mb-4">
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  value={feedback.userId}
                  onChange={(e) =>
                    setFeedback({ ...feedback, userId: e.target.value })
                  }
                  placeholder="User ID"
                  className="w-full p-3 bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="appointmentId"
                  name="appointmentId"
                  value={feedback.appointmentId}
                  onChange={(e) =>
                    setFeedback({ ...feedback, appointmentId: e.target.value })
                  }
                  placeholder="Appointment ID"
                  className="w-full p-3 bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  value={feedback.rating}
                  onChange={(e) =>
                    setFeedback({ ...feedback, rating: e.target.value })
                  }
                  placeholder="Rating (1-10)"
                  className="w-full p-3 bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700"
                  required
                />
              </div>

              <div className="mb-6">
                <textarea
                  id="comments"
                  name="comments"
                  value={feedback.comments}
                  onChange={(e) =>
                    setFeedback({ ...feedback, comments: e.target.value })
                  }
                  placeholder="Comments"
                  className="w-full p-3 bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AppointmentStatus />
    </>
  );
};

export default Appointment;
