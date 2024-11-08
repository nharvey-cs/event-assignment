import React from "react";

const EventList = ({ events, onDelete }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{event.company}</p>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
