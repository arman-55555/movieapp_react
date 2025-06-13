import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1 className="favorites-title">
          <span className="title-icon">❤️</span>
          Your Favorite Movies
        </h1>
        <div className="favorites-count">
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
        </div>
      </div>
      
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <div className="empty-icon">🎥</div>
          <h3>No favorites yet</h3>
          <p>Start exploring movies and add them to your favorites!</p>
          <Link to="/" className="browse-button">
            <span>🔍</span> Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
