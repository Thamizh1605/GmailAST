import React, { useEffect, useState } from "react";
import axios from "axios";
import Emaildetail from "../EmailDetail/Emaildetail";

const Spam = () => {
  const [spamEmails, setSpamEmails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/spam")
      .then(response => {
        setSpamEmails(response.data);
      })
      .catch(error => {
        console.error("Error fetching spam emails:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-800 mb-4 p-4">🚫 Spam Emails</h1>
      <Emaildetail emails={spamEmails} />
    </div>
  );
};

export default Spam;
