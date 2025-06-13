import { useMovieContext } from '../contexts/MovieContext';
import '../css/Notification.css';

function Notification() {
  const { notification } = useMovieContext();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {notification.type === 'success' ? '✅' : '❌'}
        </span>
        <span className="notification-message">{notification.message}</span>
      </div>
    </div>
  );
}

export default Notification;

