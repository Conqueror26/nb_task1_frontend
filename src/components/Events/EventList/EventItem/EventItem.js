import React from "react";
import "./EventItem.css";
const eventItem = (props) => {
  return (
    <>
      <li key={props.eventId} className="events_list-item">
        <div>
          <h1>Appointment:{props.title}</h1>
          <h2> Date and Time:{props.time}</h2>
          <h2>Guest:{props.guest}</h2>
        </div>

        <div>
          {/* <button
            className="btn"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </button> */}

          <h3>Agenda:{props.agenda}</h3>
        </div>
      </li>
    </>
  );
};

export default eventItem;
