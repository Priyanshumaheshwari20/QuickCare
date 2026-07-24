import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import "./CalenderCard.css";

function CalendarCard() {

  const schedules = [
    {
      id: 1,
      patient: "Rahul Sharma",
      time: "10:00 AM",
    },
    {
      id: 2,
      patient: "Priya Gupta",
      time: "11:30 AM",
    },
    {
      id: 3,
      patient: "Amit Verma",
      time: "03:00 PM",
    },
  ];

  return (
    <div className="calendar-card">

      <div className="calendar-header">

        <h4>
          <FaCalendarAlt />
          Today's Schedule
        </h4>

      </div>

      <div className="calendar-date">

        <h2>
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
          })}
        </h2>

        <p>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
          })}
        </p>

      </div>

      <div className="schedule-list">

        {schedules.map((item) => (

          <div
            className="schedule-item"
            key={item.id}
          >

            <div>

              <h6>{item.patient}</h6>

              <span>
                <FaClock />
                {item.time}
              </span>

            </div>

            <button className="btn btn-outline-primary btn-sm">
              View
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CalendarCard;