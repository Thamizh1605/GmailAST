import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"; // Back icon
import axios from "axios"; // API call

const EmailDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [replyType, setReplyType] = useState(""); // Positive, Negative, Other
  const [otherInput, setOtherInput] = useState("");
  const [generatedReply, setGeneratedReply] = useState(""); // Store AI-generated response
  const [summary, setSummary] = useState(""); // Store summary
  const [loadingReply, setLoadingReply] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  if (!email) {
    return <div className="text-center text-red-500 text-xl p-5">Email not found!</div>;
  }

  // API Call for Auto Reply
  const handleGenerateReply = async () => {
    const responseType = replyType === "Other" ? otherInput : replyType;
    if (!responseType) {
      alert("Please select a reply type or enter a response.");
      return;
    }

    setLoadingReply(true);
    try {
      const response = await axios.post("http://localhost:5000/autoreply", {
        email,
        response_type: responseType,
      });
      setGeneratedReply(response.data.body);
    } catch (error) {
      console.error("Error generating reply:", error);
      alert("Failed to generate reply.");
    } finally {
      setLoadingReply(false);
    }
  };

  // API Call for Summarization
  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        body: email.body,
      });
      setSummary(response.data.body);
    } catch (error) {
      console.error("Error summarizing email:", error);
      alert("Failed to summarize email.");
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 ">
      {/* Back Button */}
      <button
        className="mb-6 flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition bg-blue-900 text-white"
        onClick={() => navigate("/dash/board")}
      >
        <BiArrowBack size={20} />
        Back to Inbox
      </button>

      {/* Email Content */}
      <div className="p-6 rounded-xl shadow-md bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-900">{email.subject || "No Subject"}</h2>
        <p className="text-sm mt-1 text-blue-500">{new Date(email.time).toLocaleString()}</p>
        <p className="mt-4 text-lg font-semibold text-blue-900">From: {email.from}</p>
        <div className="mt-6 p-4 rounded-lg shadow-inner bg-white text-gray-900 whitespace-pre-line">
          {email.body}
        </div>
      </div>

      {/* Auto Reply & Summarization */}
      <div className="mt-6 flex gap-6">
        {/* Auto Reply Section */}
        <div className="flex-1 p-4 rounded-xl shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Auto Reply</h3>
          <div className="flex gap-3 mt-3">
            {["Positive", "Negative", "Other"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg font-semibold transition border ${
                  replyType === type ? "bg-blue-500 text-white" : "text-blue-900 border-blue-900"
                }`}
                onClick={() => setReplyType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {replyType === "Other" && (
            <input
              type="text"
              className="mt-3 w-full p-2 border rounded-lg border-blue-900 text-blue-900"
              placeholder="Enter your custom response..."
              value={otherInput}
              onChange={(e) => setOtherInput(e.target.value)}
            />
          )}
          <button
            className="mt-4 px-4 py-2 rounded-lg font-semibold transition w-full bg-blue-500 text-white disabled:opacity-50"
            onClick={handleGenerateReply}
            disabled={loadingReply}
          >
            {loadingReply ? "Generating..." : "Generate Reply"}
          </button>
          <div className="mt-4 border-t border-gray-300 pt-4">
            <textarea
              className="w-full p-4 text-gray-900 resize-none border-none bg-transparent focus:outline-none"
              rows="6"
              value={generatedReply}
              readOnly
            />
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="w-px bg-gray-400"></div>

        {/* Summarize Section */}
        <div className="flex-1 p-4 rounded-xl shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Summarize Email</h3>
          <button
            className="mt-3 px-4 py-2 rounded-lg font-semibold transition w-full bg-blue-900 text-white disabled:opacity-50"
            onClick={handleSummarize}
            disabled={loadingSummary}
          >
            {loadingSummary ? "Summarizing..." : "Summarize"}
          </button>
          <div className="mt-4 border-t border-gray-300 pt-4">
            <textarea
              className="w-full p-4 text-gray-900 resize-none border-none bg-transparent focus:outline-none"
              rows="6"
              value={summary}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailPage;
