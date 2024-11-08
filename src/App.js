import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import EventList from "./EventList";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";

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
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Event List</h1>
                <EventForm onAddEvent={addEvent} />
                <EventList events={events} onDelete={handleDelete} />
              </>
            }
          />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
