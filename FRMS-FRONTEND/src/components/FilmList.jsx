import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FilmList = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/films')
            .then(res => setFilms(res.data))
            .catch(err => console.log(err));
    }, []);

    const deleteFilm = (id) => {
        axios.delete(`http://localhost:5000/api/films/${id}`)
            .then(() => setFilms(films.filter(f => f.film_id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Welcome to BENNIQ Studio</h1>
            <h2 className="text-2xl font-bold mb-4">Film List</h2>
            <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Film</Link>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Director</th>
                        <th className="border px-4 py-2">Duration</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map(film => (
                        <tr key={film.film_id}>
                            <td className="border px-4 py-2">{film.film_id}</td>
                            <td className="border px-4 py-2">{film.title}</td>
                            <td className="border px-4 py-2">{film.category}</td>
                            <td className="border px-4 py-2">{film.director}</td>
                            <td className="border px-4 py-2">{film.duration} min</td>
                            <td className="border px-4 py-2">{film.status}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/edit/${film.film_id}`} className="text-blue-500 mr-2">Edit</Link>
                                <button onClick={() => deleteFilm(film.film_id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilmList;
