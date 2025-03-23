import React, { useEffect, useState } from "react";
import axios from "axios";
import Emaildetail from "../EmailDetail/Emaildetail";

const PriorityEmail = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/prioritize-emails")
      .then(response => {
        setEmails(response.data);
      })
      .catch(error => {
        console.error("Error fetching priority emails:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-800 mb-4 p-4">📌 Prioritized Emails</h1>
      <Emaildetail emails={emails} />
    </div>
  );
};

export default PriorityEmail;