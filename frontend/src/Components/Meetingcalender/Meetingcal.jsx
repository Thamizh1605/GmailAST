import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Meetingcal = () => {
  const [meetings, setMeetings] = useState([]);
  const [todayMeetings, setTodayMeetings] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/meetcal");
        const filteredMeetings = res.data.filter(
          (meeting) => new Date(meeting.start) >= new Date()
        );
        setMeetings(filteredMeetings);
        console.log(filteredMeetings);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };
  
    fetchMeetings();
  }, []);
  

  useEffect(() => {
    const todaysMeetings = meetings.filter((meeting) => meeting.start.startsWith(today));
    setTodayMeetings(todaysMeetings);
  }, [meetings, today]);

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    return meetings.some((meeting) => meeting.start.startsWith(dateString)) ? "highlight" : "";
  };

  return (
    <div className="meeting-calendar-container">
      <h2>📅 Meeting Calendar</h2>
      <div className="calendar-wrapper">
        <Calendar tileClassName={tileClassName} />
        <div className="upcoming-meetings">
          <h3>📋 Upcoming Meetings</h3>
          {meetings.length === 0 ? (
            <p>No upcoming meetings.</p>
          ) : (
            <ul>
              {meetings.map((meeting, index) => (
                <li key={index}>
                  <strong>{new Date(meeting.start).toLocaleDateString()}</strong>
                  <br />
                  🕒 {new Date(meeting.start).toLocaleTimeString()}
                  <br />
                  📌 {meeting.summary}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style>{`
        .meeting-calendar-container {
          text-align: center;
          font-family: Arial, sans-serif;
          margin: 20px auto;
          width: 80%;
          max-width: 600px;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .calendar-wrapper {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .highlight {
          background-color: #007bff !important;
          color: white;
          border-radius: 50%;
        }

        .upcoming-meetings {
          text-align: left;
          width: 100%;
          max-width: 250px;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .upcoming-meetings ul {
          list-style: none;
          padding: 0;
        }

        .upcoming-meetings li {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        .upcoming-meetings li:last-child {
          border-bottom: none;
        }

        @media (max-width: 600px) {
          .calendar-wrapper {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Meetingcal;
