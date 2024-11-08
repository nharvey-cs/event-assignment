import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(
          `https://rf-json-server.herokuapp.com/events/${id}`
        );
        setEvent(data);
        setName(data.name || "");
        setDescription(data.description || "");
        setCompany(data.company || "");
        setColor(data.color || "");
        setDate(data.date || "");
        setTime(data.time || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setImage(data.image || "");
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSave = async () => {
    const updatedEvent = {
      name,
      description,
      company,
      color,
      date,
      time,
      email,
      phone,
      address,
      image,
    };

    try {
      const { data } = await axios.put(
        `https://rf-json-server.herokuapp.com/events/${id}`,
        updatedEvent
      );
      setEvent(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div>
      <h2>{isEditing ? "Edit Event" : event.name}</h2>
      {isEditing ? (
        <>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={() => handleSave()}>Save</button>
        </>
      ) : (
        <>
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
          <p>
            <strong>Created On:</strong>{" "}
            {isNaN(new Date(event.createdOn))
              ? "N/A"
              : new Date(event.createdOn).toLocaleString()}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EventDetail;
