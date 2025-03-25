import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentStatus = () => {
  const [state, setState] = useState([]);
  const [appointStatus, setAppointStatus] = useState([]);
  const [RoomId, setRoomId] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();

  const handleRoomJoin = useCallback(() => {
    if (state.user) {
      navigate(`/room/${RoomId}`);
    } else {
      alert("Please login to join the room");
    }
  }, [navigate, RoomId, state.user]);

  useEffect(() => {
    const userState = Cookies.get("userState");
    if (userState) {
      const parsedState = JSON.parse(userState);
      setState(parsedState);
    }
  }, []);

  const getAppointmentStatus = async () => {
    if (state?.user?.id) {
      try {
        const response = await fetch(
          `https://dentalmasters.onrender.com/api/v1/appointment/patient/${state.user.id}`
        );
        const data = await response.json();
        setAppointStatus(data);

        // Initialize time remaining for each appointment
        const initialTimes = {};
        data.forEach((appointment) => {
          initialTimes[appointment._id] = calculateTimeDifference(
            appointment.date
          );
        });
        setTimeRemaining(initialTimes);
      } catch (error) {
        console.error("Error fetching appointment status:", error);
      }
    }
  };

  useEffect(() => {
    if (state?.user?.id) {
      getAppointmentStatus();
    }
  }, [state]);

  // Function to calculate time difference
  const calculateTimeDifference = (appointmentDate) => {
    const appointmentTime = new Date(appointmentDate);
    const currentTime = new Date();
    const timeDifference = appointmentTime - currentTime;

    if (timeDifference <= 0) {
      return 0; // Appointment h
      // as started
    }

    return timeDifference; // Return remaining time in milliseconds
  };

  // Periodically update time remaining
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      appointStatus.forEach((appointment) => {
        updatedTimes[appointment._id] = calculateTimeDifference(
          appointment.date
        );
      });
      setTimeRemaining(updatedTimes);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [appointStatus]);

  // Filter out cancelled appointments
  const filteredAppointments = appointStatus.filter(
    (appointment) => appointment.status !== "cancelled"
  );

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">
        Appointment Status
      </h1>
      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAppointments.map((appointment) => {
            const timeLeft = timeRemaining[appointment._id] || 0;
            const isDisabled = timeLeft > 0;

            return (
              <div
                key={appointment._id}
                className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-600">
                    Appointment Details
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      appointment.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : appointment.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="text-gray-700 space-y-2">
                  <p>
                    <span className="font-semibold">Appoint Id: </span>
                    {appointment._id}
                  </p>
                  <p>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {appointment.doctorName}
                  </p>
                  <p>
                    <span className="font-semibold">Patient:</span>{" "}
                    {appointment.patientName}
                  </p>
                  <p>
                    <span className="font-semibold">Service ID:</span>{" "}
                    {appointment.serviceId}
                  </p>
                  <p>
                    <span className="font-semibold">Notes:</span>{" "}
                    {appointment.notes || "No notes provided"}
                  </p>
                  <p>
                    <span className="font-semibold">Reminder Sent:</span>{" "}
                    {appointment.reminderSent ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(appointment.date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Time Remaining:</span>{" "}
                    {timeLeft > 0
                      ? `${Math.floor(
                          timeLeft / (1000 * 60 * 60)
                        )} hours and ${Math.floor(
                          (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
                        )} minutes remaining`
                      : "Appointment has started"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="mt-6">
                      <input
                        type="text"
                        className="bg-blue-100 border border-gray-400 rounded-md px-4 py-2 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your Room id"
                        value={RoomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        disabled={isDisabled}
                      />
                      <p>* RoomId is appointment id</p>
                    </div>
                    <button
                      className={`px-5 py-2 rounded-md shadow-md transition duration-300 ${
                        isDisabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      onClick={handleRoomJoin}
                      disabled={isDisabled}
                    >
                      {isDisabled ? "Wait" : "Join"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentStatus;
