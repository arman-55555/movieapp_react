import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const addToFavorites = (movie) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id)
        if (!isAlreadyFavorite) {
            setFavorites(prev => [...prev, movie])
            showNotification(`"${movie.title}" added to favorites! ❤️`)
        }
    }

    const removeFromFavorites = (movieId) => {
        const movie = favorites.find(fav => fav.id === movieId)
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
        if (movie) {
            showNotification(`"${movie.title}" removed from favorites 💔`)
        }
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        notification
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}