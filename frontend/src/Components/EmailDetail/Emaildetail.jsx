import React from "react";
import { useNavigate } from "react-router-dom";

const Emaildetail = ({ emails }) => {
  const navigate = useNavigate();

  if (!emails || emails.length === 0) {
    return <p className="text-gray-600 text-center">No emails available.</p>;
  }

  return (
    <div className="p-4">
      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.id || Math.random()}
            className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-sm cursor-pointer hover:bg-blue-50 transition-all duration-200"
            onClick={() => navigate(`/email/${email.id}`, { state: { email } })}
          >
            <p className="font-semibold text-blue-900">
              {email.from ? email.from.split("<")[0] : "Unknown Sender"}
            </p>
            <p className="text-sm text-gray-700">
              {email.subject || "No Subject"}
            </p>
            <p className="text-xs text-gray-600">
              {email.body ? email.body.substring(0, 100) + "..." : "No Content"}
            </p>
            <p className="text-xs text-gray-500">
              {email.time ? new Date(email.time).toLocaleString() : "Unknown Time"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emaildetail;
