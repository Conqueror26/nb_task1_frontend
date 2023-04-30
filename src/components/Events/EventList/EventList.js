import React from "react";
import "./EventList.css";
import EventItem from "./EventItem/EventItem";
const eventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        time={event.time}
        guest={event.guest}
        agenda={event.agenda}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="events_list">{events}</ul>;
};

export default eventList;
