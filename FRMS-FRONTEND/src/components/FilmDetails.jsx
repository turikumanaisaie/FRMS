import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const FilmDetails = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/films/${id}`)
            .then(res => setFilm(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!film) return <p>Loading...</p>;

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Film Details</h1>
            <p><strong>Title:</strong> {film.title}</p>
            <p><strong>Category:</strong> {film.category}</p>
            <p><strong>Director:</strong> {film.director}</p>
            <p><strong>Duration:</strong> {film.duration} min</p>
            <p><strong>Recording Date:</strong> {film.recording_date}</p>
            <p><strong>Status:</strong> {film.status}</p>
            <Link to="/" className="text-blue-500 mt-4 inline-block">Back to list</Link>
        </div>
    );
};

export default FilmDetails;
