import React from "react";

const EventList = ({ events }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{event.company}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
