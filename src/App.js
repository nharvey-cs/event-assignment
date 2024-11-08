import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "./EventList";
import EventForm from "./EventForm";

const App = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const { data } = await axios.get(
      `https://rf-json-server.herokuapp.com/events/`
    );
    const sortedEvents = data.sort((a, b) =>
      a.company.localeCompare(b.company)
    );
    setEvents(sortedEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const { data } = await axios.post(
        "https://rf-json-server.herokuapp.com/events/",
        newEvent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEvents((prevEvents) =>
        [...prevEvents, data].sort((a, b) => a.company.localeCompare(b.company))
      );
    } catch (error) {
      console.error("Failed to add new event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rf-json-server.herokuapp.com/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div>
      <h1>Event List</h1>
      <EventForm onAddEvent={addEvent} />
      <EventList events={events} onDelete={handleDelete} />
    </div>
  );
};

export default App;
