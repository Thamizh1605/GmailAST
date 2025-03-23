import React, { useEffect, useState } from "react";
import axios from "axios";
import Emaildetail from "../EmailDetail/Emaildetail";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-mails")
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-green-600 font-semibold text-center">Loading...</p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-4">📩 Inbox</h1>
          <Emaildetail emails={emails} />
        </div>
      )}
    </div>
  );
};

export default Inbox;
