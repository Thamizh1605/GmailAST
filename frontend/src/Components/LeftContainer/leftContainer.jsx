import React from "react";
import { Link } from "react-router-dom";
import { 
  FaUser, FaEnvelopeOpenText, FaExclamationTriangle, 
  FaRobot, FaPaperPlane, FaCalendarAlt, FaStar, 
  FaSignOutAlt, FaSignInAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LeftContainer = ({ isSigned, setIsSigned, username, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsSigned(false);
    navigate("/");
  };

  return (
    <div className="w-1/4 bg-[#142d4c] p-4 md:w-1/3 lg:w-1/6 text-white flex flex-col gap-4">
      
        <div className="flex items-center gap-3 border-b pb-3">
        <FaUser size={28} />
        <div>
            <p className="text-lg font-semibold">{isSigned?username:"No User"}</p>
            <p className="text-xs text-gray-300">{isSigned?userEmail:""}</p>
        </div>
        </div>
      {isSigned ? (
        <>
          {/* User Profile */}

          {/* Menu Items */}
          <div className="flex flex-col gap-3 mt-3">
            <Link to="/inbox">
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaEnvelopeOpenText />
              <p>Inbox</p>
            </div>
            </Link>

            <Link to="/spam">
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaExclamationTriangle />
              <p>Spam</p>
            </div>
            </Link>

            <Link to='/ai'>
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaRobot />
              <p>AI Chatbot</p>
            </div>
            </Link>

            <Link to='/send/email'>
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaPaperPlane />
              <p>Send Email</p>
            </div>
            </Link>

            <Link to='/meetcal'>
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaCalendarAlt />
              <p>Meetings</p>
            </div>
            </Link>

            <Link to='/priority'>
            <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
              <FaStar />
              <p>Priority Email</p>
            </div>
            </Link>
          </div>

          {/* Logout */}
          <div
            className="mt-auto border-t pt-3 cursor-pointer flex items-center gap-3 hover:text-gray-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <p>Log Out</p>
          </div>
        </>
      ) : (
        <div 
          className="mt-auto border-t pt-3 cursor-pointer flex items-center gap-3 hover:text-gray-300"
          onClick={() => navigate("/sign/in")}
        >
          <FaSignInAlt />
          <p>Sign In</p>
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
