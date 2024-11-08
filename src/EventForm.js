import React, { useState } from "react";
import { namedColors } from "./namedColors";

const EventForm = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namedColors.includes(color.toLowerCase())) {
      setColorError("Please enter a valid, web safe color name.");
      return;
    }
    setColorError("");
    const newEvent = {
      name,
      description,
      company,
      color,
      createdOn: new Date().toISOString(),
    };
    onAddEvent(newEvent);
    setName("");
    setDescription("");
    setCompany("");
    setColor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Company:</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            if (colorError) setColorError("");
          }}
          required
        />
        {colorError && <p style={{ color: "red" }}>{colorError}</p>}
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
