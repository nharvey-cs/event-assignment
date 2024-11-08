import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "./EventList";

const App = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const { data } = await axios.get(
      `https://rf-json-server.herokuapp.com/events/`
    );
    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      <EventList events={events} />
    </div>
  );
};

export default App;
