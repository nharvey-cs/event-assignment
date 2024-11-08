import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return <div>{JSON.stringify(events)}</div>;
};

export default App;
