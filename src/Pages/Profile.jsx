import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Profile = () => {
  const [state, setState] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    role: "",
    phoneNumber: "",
    email: "",
    address: "",
    referralCode: "",
    loyaltyPoints: 0,
    isVerified: false,
    createdAt: "",
  });

  useEffect(() => {
    const userState = Cookies.get("userState");
    if (userState) {
      const parsedState = JSON.parse(userState);
      setState(parsedState);
      setPatientId(parsedState.user.id);
    }
  }, []);

  const getPatientById = async (patientId) => {
    console.log(patientId)
    const response = await fetch(
      `https://dentalmasters.onrender.com/api/v1/user/${patientId}`
    );
    const data = await response.json();
    console.log(data)
    setPatientData(data);
    setFormData({
      image: data.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg",
      name: data.name,
      role: data.role,
      phoneNumber: data.phone,
      email: data.email,
      address: "Patient's Address", // Replace with actual data if available
      referralCode: data.referralCode,
      loyaltyPoints: data.loyaltyPoints,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
    });
  };

  useEffect(() => {
    if (patientId) {
      getPatientById(patientId);
    }
  }, [patientId]);

  const copyReferralCode = () => {
    navigator.clipboard
      .writeText(formData.referralCode)
      .then(() => {
        alert("Referral code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy referral code: ", err);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">User Profile</h1>
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md relative">
        {/* Profile Information Section */}
        <div className="flex flex-col lg:flex-row items-center gap-5 mb-6">
          <img
            src={formData.image}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 lg:mb-0"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{formData.name}</h2>
            <p className="text-sm text-gray-500">{formData.role}</p>
          </div>
        </div>

        {/* User Details Section */}
        <div className="flex flex-col gap-4 mb-6 text-gray-700">
          <p>
            <span className="font-semibold">Phone Number:</span> {formData.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {formData.address}
          </p>
          <p>
            <span className="font-semibold">Referral Code:</span>{" "}
            <span className="text-blue-600 font-medium cursor-pointer bg-blue-200 p-2 py-1 border-dashed border-gray-800 border-2" onClick={copyReferralCode}>
              {formData.referralCode}
            </span>
          </p>
          <p>
            <span className="font-semibold">Loyalty Points:</span> {formData.loyaltyPoints}
          </p>
          <p>
            <span className="font-semibold">Account Verified:</span>{" "}
            {formData.isVerified ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(formData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
