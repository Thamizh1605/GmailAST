import React, { useEffect, useState } from "react";
import axios from "axios";
import Emaildetail from "../EmailDetail/Emaildetail";

const PriorityEmail = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/prioritize-emails")
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching priority emails:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">📌 Prioritized Emails</h1>

      {loading ? (
        <p className="text-green-600 font-semibold text-center">Loading...</p>
      ) : emails.length === 0 ? (
        <p className="text-gray-500 text-center font-medium">
          No priority emails found.
        </p>
      ) : (
        <Emaildetail emails={emails} />
      )}
    </div>
  );
};

export default PriorityEmail;
