import React from 'react';

const features = [
  {
    title: "Advanced Email Summarization & Prioritization",
    description: "Our AI-powered summarization tool condenses lengthy emails into concise summaries, highlighting important details for quick understanding.",
  },
  {
    title: "AI-Powered Smart Email Assistant",
    description: "Get intelligent auto-reply suggestions based on email context, allowing faster and more effective communication.",
  },
  {
    title: "AI-Based Email Phishing & Spam Detection",
    description: "Detect and filter out phishing and spam emails using machine learning algorithms to keep your inbox secure.",
  },
  {
    title: "Meeting & Task Extraction",
    description: "Automatically extract meeting schedules and tasks from emails and sync them with Google Calendar for seamless organization.",
  },
  {
    title: "Multilingual Email Handling",
    description: "Translate emails instantly to multiple languages, ensuring smooth communication across different regions and languages.",
  },
];

const About = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-12">About Our AI-Powered Gmail Assistant</h2>
      <div className="space-y-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } bg-green-100 p-6 rounded-2xl shadow-lg`}
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-green-800">{feature.title}</h3>
              <p className="text-green-700 mt-2">{feature.description}</p>
            </div>
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              {/* Placeholder for potential icons/images */}
              <div className="w-24 h-24 bg-green-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
