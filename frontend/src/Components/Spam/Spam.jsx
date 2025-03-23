import React, { useEffect, useState } from "react";
import axios from "axios";
import Emaildetail from "../EmailDetail/Emaildetail";

const Spam = () => {
  const [spamEmails, setSpamEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/spam")
      .then((response) => {
        setSpamEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spam emails:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-red-800 mb-4">🚫 Spam Emails</h1>

      {loading ? (
        <p className="text-green-600 font-semibold text-center">Loading...</p>
      ) : spamEmails.length === 0 ? (
        <p className="text-gray-500 text-center font-medium">
          No spam emails found. 🎉
        </p>
      ) : (
        <Emaildetail emails={spamEmails} />
      )}
    </div>
  );
};

export default Spam;
