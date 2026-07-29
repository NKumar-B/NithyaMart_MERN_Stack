import { useState } from 'react';

// Inline mock data containing movies, genres, descriptions, prices, showtimes, and banner URLs
const moviesData = [
  {
    id: 1,
    title: "Interstellar Odyssey",
    genre: "Sci-Fi / Adventure",
    duration: "2h 49m",
    rating: 8.6,
    price: 250.00,
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    showtimes: ["10:00 AM", "01:30 PM", "05:00 PM", "08:30 PM"]
  },
  {
    id: 2,
    title: "The Cyber Heist",
    genre: "Action / Thriller",
    duration: "2h 10m",
    rating: 7.9,
    price: 220.00,
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=300",
    description: "A brilliant group of ethical hackers are framed for a global digital conspiracy and must clear their names.",
    showtimes: ["11:15 AM", "02:45 PM", "06:15 PM", "09:45 PM"]
  },
  {
    id: 3,
    title: "Echoes of Eternity",
    genre: "Drama / Mystery",
    duration: "1h 55m",
    rating: 8.2,
    price: 200.00,
    banner: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300",
    description: "An aging watchmaker discovers a vintage pocket watch that seems to alter local time events by minutes.",
    showtimes: ["09:30 AM", "12:45 PM", "04:00 PM", "07:30 PM"]
  }
];

export default function MovieBooking({ onCheckoutSuccess }) {
  const [selectedMovie, setSelectedMovie] = useState(moviesData[0]);
  const [selectedDate, setSelectedDate] = useState('Today, July 29');
  const [selectedShowtime, setSelectedShowtime] = useState(selectedMovie.showtimes[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate random reserved seats based on movie/time
  const getReservedSeats = (movieId, showtime) => {
    // Deterministic mock reserved seats using hash
    const hash = (movieId + showtime).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let i = 0; i < 15; i++) {
      const rowIdx = (hash + i * 3) % rows.length;
      const col = ((hash + i * 7) % 10) + 1;
      seats.push(`${rows[rowIdx]}${col}`);
    }
    return seats;
  };

  const reservedSeats = getReservedSeats(selectedMovie.id, selectedShowtime);

  const dates = [
    'Today, July 29',
    'Tomorrow, July 30',
    'Friday, July 31',
    'Saturday, Aug 01'
  ];

  const handleMovieChange = (movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(movie.showtimes[0]);
    setSelectedSeats([]);
  };

  const handleShowtimeChange = (time) => {
    setSelectedShowtime(time);
    setSelectedSeats([]);
  };

  const toggleSeat = (seatId) => {
    if (reservedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatCols = Array.from({ length: 10 }, (_, i) => i + 1);

  const subtotal = selectedSeats.length * selectedMovie.price;
  const bookingFee = selectedSeats.length > 0 ? 2.00 : 0.00;
  const total = subtotal + bookingFee;

  const handleBookTickets = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed with ticket booking.");
      return;
    }
    onCheckoutSuccess({
      type: 'movie',
      receiptId: Math.floor(100000 + Math.random() * 900000),
      movieTitle: selectedMovie.title,
      showtime: selectedShowtime,
      date: selectedDate,
      seats: selectedSeats,
      price: subtotal,
      total: total
    });
    setSelectedSeats([]);
  };

  return (
    <div className="movie-booking-container">
      {/* Movie Details Selector Section */}
      <section className="movies-selector-panel">
        <h3 className="section-title">Select Movie</h3>
        <div className="movies-list">
          {moviesData.map((movie) => (
            <div 
              key={movie.id} 
              className={`movie-option-card ${selectedMovie.id === movie.id ? 'active' : ''}`}
              onClick={() => handleMovieChange(movie)}
            >
              <span className="movie-poster-emoji">
                <img src={movie.banner} alt={movie.title} />
              </span>
              <div className="movie-card-info">
                <h4>{movie.title}</h4>
                <p className="movie-meta">{movie.genre} • {movie.duration}</p>
                <div className="movie-rating-badge">★ {movie.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Configuration Section */}
      <section className="booking-control-panel">
        <div className="movie-synopsis-box">
          <h3>{selectedMovie.title}</h3>
          <p className="synopsis-desc">{selectedMovie.description}</p>
          <span className="ticket-rate-label">Ticket Rate: <strong>₹{selectedMovie.price.toFixed(2)}</strong></span>
        </div>

        <div className="booking-schedule-config">
          <div className="schedule-group">
            <h4>Select Date</h4>
            <div className="schedule-tabs">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`schedule-tab ${selectedDate === date ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="schedule-group">
            <h4>Select Showtime</h4>
            <div className="schedule-tabs">
              {selectedMovie.showtimes.map((time) => (
                <button
                  key={time}
                  className={`schedule-tab ${selectedShowtime === time ? 'active' : ''}`}
                  onClick={() => handleShowtimeChange(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seat Layout Selector */}
        <div className="cinema-hall-container">
          <div className="screen-indicator">
            <div className="screen-curve"></div>
            <span>CINEMA SCREEN THIS WAY</span>
          </div>

          <div className="seats-grid">
            {seatRows.map((row) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                <div className="row-seats">
                  {seatCols.map((col) => {
                    const seatId = `${row}${col}`;
                    const isReserved = reservedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    
                    let seatClass = 'seat-btn available';
                    if (isReserved) seatClass = 'seat-btn reserved';
                    else if (isSelected) seatClass = 'seat-btn selected';

                    return (
                      <button
                        key={seatId}
                        className={seatClass}
                        onClick={() => toggleSeat(seatId)}
                        disabled={isReserved}
                        title={`Seat ${seatId}`}
                        aria-label={`Seat ${seatId}`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
                <span className="row-label">{row}</span>
              </div>
            ))}
          </div>

          <div className="seating-legend">
            <div className="legend-item">
              <span className="legend-box available"></span>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-box selected"></span>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <span className="legend-box reserved"></span>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Dynamic Ticket Invoice */}
        <div className="booking-invoice-summary">
          <h3>Booking Statement</h3>
          <div className="invoice-row">
            <span>Selected Seats ({selectedSeats.length}):</span>
            <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
          </div>
          <div className="invoice-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="invoice-row">
            <span>Booking Fee:</span>
            <span>₹{bookingFee.toFixed(2)}</span>
          </div>
          <div className="invoice-row total">
            <span>Total Price:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button 
            className="btn-primary block checkout-booking-btn"
            disabled={selectedSeats.length === 0}
            onClick={handleBookTickets}
          >
            Confirm & Book {selectedSeats.length > 0 ? `(${selectedSeats.length} Seats)` : ''}
          </button>
        </div>
      </section>
    </div>
  );
}