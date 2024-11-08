import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h2>{event.name}</h2>
          </Link>
          <p>{event.description}</p>
          <p>{event.company}</p>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
