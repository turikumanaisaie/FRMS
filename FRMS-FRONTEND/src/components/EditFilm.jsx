import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFilm = () => {
    const [form, setForm] = useState({
        title: '', category: '', director: '', duration: '', recording_date: '', status: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/films/${id}`)
            .then(res => setForm(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/films/${id}`, form)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Edit Film</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 w-full"/>
                <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full">
                    <option>Documentary</option>
                    <option>Music Video</option>
                    <option>Short Film</option>
                    <option>Advertisement</option>
                </select>
                <input name="director" placeholder="Director" value={form.director} onChange={handleChange} className="border p-2 w-full"/>
                <input name="duration" type="number" placeholder="Duration (min)" value={form.duration} onChange={handleChange} className="border p-2 w-full"/>
                <input name="recording_date" type="date" value={form.recording_date} onChange={handleChange} className="border p-2 w-full"/>
                <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
                    <option>In Production</option>
                    <option>Editing</option>
                    <option>Completed</option>
                </select>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Film</button>
            </form>
        </div>
    );
};

export default EditFilm;
