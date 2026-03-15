import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFilm = () => {
  const [form, setForm] = useState({
    title: "",
    category: "Documentary",
    director: "",
    duration: "",
    recording_date: "",
    status: "In Production",
  });

  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/films", form)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-indigo-600 text-center mb-8 tracking-wide">
          Add New Film
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Film Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>Documentary</option>
            <option>Music Video</option>
            <option>Short Film</option>
            <option>Advertisement</option>
          </select>

          <input
            name="director"
            placeholder="Director Name"
            value={form.director}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="duration"
            type="number"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="recording_date"
            type="date"
            value={form.recording_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>In Production</option>
            <option>Editing</option>
            <option>Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
          >
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFilm;
