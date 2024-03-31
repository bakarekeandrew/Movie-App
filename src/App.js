import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './css/tailwind.css';
import './index.css';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=faf51810";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        searchMovies("Spiderman");
    }, []);

    return (
        <div className="min-h-screen items-center justify-center bg-gray-100 wrapper">
            <div className="max-w-screen-xl w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">MovieLand</h1>
                <div className="flex items-center mb-4">
                    <input
                        className="flex-1 mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        type="text"
                        placeholder="Search for a movie..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                        onClick={() => searchMovies(searchTerm)}
                    >
                        Search
                    </button>
                </div>
                {movies?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">No Movies Found</h2>
                    </div>
                )}
            </div>
        </div>

    );
};

export default App;
