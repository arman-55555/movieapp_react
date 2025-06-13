import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularMovies = await getPopularMovies();
        if (popularMovies && popularMovies.length > 0) {
          setMovies(popularMovies);
        } else {
          setError("No movies found. Please try again later.");
        }
      } catch (err) {
        console.error('Error loading popular movies:', err);
        setError("Failed to load movies. Please check your internet connection.");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Discover Amazing Movies</h1>
        <p className="hero-subtitle">Find your next favorite film from thousands of movies</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for movies, actors, genres..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Search"}
            </button>
          </div>
        </form>
      </div>

      <div className="content-section">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {!error && (
          <div className="section-header">
            <h2>{searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}</h2>
            <div className="results-count">{movies.length} movies found</div>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing movies...</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
