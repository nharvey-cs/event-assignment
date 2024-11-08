import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h2>{event.name}</h2>
          </Link>
          <p>{event.description}</p>
          <p>{event.company}</p>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
