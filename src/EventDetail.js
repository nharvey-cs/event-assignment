import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(
          `https://rf-json-server.herokuapp.com/events/${id}`
        );
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      {event.image && (
        <div>
          <img
            src={event.image}
            style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <p>
        <strong>Company:</strong> {event.company}
      </p>
      <p>
        <strong>Email:</strong> {event.email}
      </p>
      <p>
        <strong>Phone:</strong> {event.phone}
      </p>
      <p>
        <strong>Address:</strong> {event.address}
      </p>
      <p>
        <strong>Color:</strong> {event.color}
      </p>
    </div>
  );
};

export default EventDetail;
