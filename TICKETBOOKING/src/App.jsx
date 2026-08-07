// import { useState } from "react";

// // CSS inside same file
// const styles = `
// :root {
//   color-scheme: dark;
// }

// body {
//   margin:0;
//   font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
//   background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 45%,#020617 100%);
//   color:#f8fafc;
// }

// *{
//   box-sizing:border-box;
// }

// .app-shell{
//   max-width:1400px;
//   margin:auto;
//   padding:32px 20px 70px;
// }

// .top-nav{
//   position:sticky;
//   top:0;
//   z-index:900;
//   display:flex;
//   justify-content:flex-end;
//   gap:12px;
//   padding:12px 16px;
//   margin-bottom:24px;
//   background:rgba(2, 6, 23, 0.8);
//   backdrop-filter:blur(8px);
//   border:1px solid rgba(255,255,255,0.12);
//   border-radius:999px;
// }

// .nav-link{
//   text-decoration:none;
//   color:#f8fafc;
//   font-weight:700;
//   padding:8px 14px;
//   border-radius:999px;
//   transition:background .2s ease;
//   background:transparent;
//   border:none;
//   cursor:pointer;
// }

// .nav-link:hover{
//   background:rgba(255,255,255,0.16);
// }

// .hero{
//   text-align:center;
//   margin-bottom:34px;
// }

// .hero h1{
//   margin:0 0 10px;
//   font-size:2.6rem;
//   letter-spacing:0.02em;
// }

// .hero p{
//   margin:0 auto;
//   max-width:700px;
//   color:#dbeafe;
//   font-size:1rem;
// }

// .movie-list{
//   display:grid;
//   grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
//   gap:24px;
// }

// .card{
//   display:flex;
//   flex-direction:column;
//   background:rgba(255,255,255,0.96);
//   color:#111827;
//   border-radius:22px;
//   overflow:hidden;
//   box-shadow:0 20px 40px rgba(15,23,42,0.25);
//   transition:transform .25s ease, box-shadow .25s ease;
// }

// .card:hover{
//   transform:translateY(-6px);
//   box-shadow:0 24px 45px rgba(15,23,42,0.3);
// }

// .poster{
//   width:100%;
//   height:320px;
//   object-fit:cover;
//   object-position:center;
// }

// .card-content{
//   display:flex;
//   flex-direction:column;
//   gap:10px;
//   padding:16px 16px 20px;
//   flex:1;
// }

// .card-title{
//   margin:0;
//   font-size:1.05rem;
//   color:#111827;
// }

// .price-pill{
//   display:inline-flex;
//   align-items:center;
//   justify-content:center;
//   width:fit-content;
//   padding:7px 11px;
//   border-radius:999px;
//   background:#dbeafe;
//   color:#1d4ed8;
//   font-weight:700;
//   font-size:0.92rem;
// }

// button{
//   font:inherit;
//   border:none;
//   border-radius:10px;
//   cursor:pointer;
//   transition:transform .2s ease, box-shadow .2s ease;
// }

// button:hover{
//   transform:translateY(-1px);
// }

// .book-btn,
// .submit-btn{
//   width:100%;
//   padding:11px 14px;
//   background:linear-gradient(135deg,#2563eb,#1d4ed8);
//   color:white;
//   box-shadow:0 10px 20px rgba(37,99,235,0.2);
// }

// .close-btn{
//   background:#ef4444;
//   color:white;
//   padding:8px 10px;
//   float:right;
// }

// .secondary-btn{
//   padding:10px 12px;
//   background:#e5e7eb;
//   color:#111827;
// }

// .modal-backdrop{
//   position:fixed;
//   inset:0;
//   z-index:1000;
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   padding:20px;
//   background:rgba(2,6,23,0.72);
// }

// .modal{
//   width:min(100%, 420px);
//   background:white;
//   color:#111827;
//   padding:22px;
//   border-radius:18px;
//   box-shadow:0 20px 45px rgba(0,0,0,0.25);
// }

// .modal h2{
//   margin:8px 0 16px;
// }

// .modal label{
//   display:block;
//   margin-top:10px;
//   font-weight:600;
// }

// .modal input,
// .modal select{
//   width:100%;
//   margin:8px 0 4px;
//   padding:10px 12px;
//   border:1px solid #d1d5db;
//   border-radius:10px;
// }

// .error{
//   margin:10px 0 0;
//   color:#dc2626;
//   font-weight:600;
// }

// .success-banner{
//   margin:0 0 24px;
//   padding:12px 16px;
//   border-radius:12px;
//   background:rgba(22, 163, 74, 0.18);
//   color:#dcfce7;
//   border:1px solid rgba(74, 222, 128, 0.4);
//   font-weight:700;
// }

// .order-card{
//   background:rgba(255,255,255,0.96);
//   color:#111827;
//   padding:16px;
//   border-radius:16px;
//   margin-bottom:12px;
//   box-shadow:0 10px 24px rgba(2,6,23,0.12);
// }

// .order-card p{
//   margin:6px 0;
// }
// `;

// if (!document.getElementById("app-style")) {
//   const style = document.createElement("style");
//   style.id = "app-style";
//   style.innerHTML = styles;
//   document.head.appendChild(style);
// }

// // Paste your complete movies array here
// const movies = [
// {
//     id: 1,
//     name: "Avengers: Endgame",
//     price: 12,
//     image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
//   },
//   {
//     id: 2,
//     name: "Spider-Man: No Way Home",
//     price: 15,
//     image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
//   },
//   {
//     id: 3,
//     name: "Avatar: The Way of Water",
//     price: 18,
//     image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
//   },
//   {
//     id: 4,
//     name: "The Batman",
//     price: 14,
//     image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
//   },
//   {
//     id: 5,
//     name: "Interstellar",
//     price: 13,
//     image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
//   },
//   {
//     id: 6,
//     name: "Joker",
//     price: 16,
//     image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
//   },
//   {
//     id: 7,
//     name: "Dune",
//     price: 17,
//     image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
//   },
//   {
//     id: 8,
//     name: "Inception",
//     price: 13,
//     image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
//   },
//   {
//     id: 9,
//     name: "Oppenheimer",
//     price: 18,
//     image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
//   },
//   {
//     id: 10,
//     name: "Barbie",
//     price: 14,
//     image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
//   },
//   {
//     id: 11,
//     name: "Top Gun: Maverick",
//     price: 16,
//     image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
//   },
//   {
//     id: 12,
//     name: "Mission: Impossible - Dead Reckoning",
//     price: 17,
//     image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg"
//   },
//   {
//     id: 13,
//     name: "Doctor Strange in the Multiverse of Madness",
//     price: 15,
//     image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
//   },
//   {
//     id: 14,
//     name: "Black Panther: Wakanda Forever",
//     price: 15,
//     image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg"
//   },
//   {
//     id: 15,
//     name: "Thor: Love and Thunder",
//     price: 14,
//     image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
//   },
//   {
//     id: 16,
//     name: "The Flash",
//     price: 13,
//     image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
//   },
//   {
//     id: 17,
//     name: "John Wick: Chapter 4",
//     price: 17,
//     image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
//   },
//   {
//     id: 18,
//     name: "Fast X",
//     price: 15,
//     image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg"
//   },
//   {
//     id: 19,
//     name: "The Super Mario Bros. Movie",
//     price: 12,
//     image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
//   },
//   {
//     id: 20,
//     name: "Guardians of the Galaxy Vol. 3",
//     price: 16,
//     image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
//   },
//   {
//   id: 21,
//   name: "The Dark Knight",
//   price: 18,
//   image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
// },
// {
//   id: 22,
//   name: "Iron Man",
//   price: 14,
//   image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
// },
// {
//   id: 23,
//   name: "Captain America: Civil War",
//   price: 15,
//   image: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg"
// },
// {
//   id: 24,
//   name: "Black Adam",
//   price: 16,
//   image: "https://image.tmdb.org/t/p/w500/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg"
// },
// {
//   id: 25,
//   name: "Aquaman",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg"
// },
// {
//   id: 26,
//   name: "The Lion King",
//   price: 13,
//   image: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"
// },
// {
//   id: 27,
//   name: "Frozen II",
//   price: 12,
//   image: "https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg"
// },
// {
//   id: 28,
//   name: "The Matrix Resurrections",
//   price: 16,
//   image: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg"
// },
// {
//   id: 29,
//   name: "Venom: Let There Be Carnage",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
// },
// {
//   id: 30,
//   name: "Minions: The Rise of Gru",
//   price: 12,
//   image: "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg"
// },
// {
//   id: 31,
//   name: "Deadpool",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/original/wYmtZIZZRa56UV2Lurei6w8PjSB.jpg"
// },
// {
//   id: 32,
//   name: "Deadpool 2",
//   price: 16,
//   image: "https://media-cache.cinematerial.com/p/500x/qcjprk2e/deadpool-2-movie-poster.jpg?v=1540913690"
// },
// {
//   id: 33,
//   name: "Logan",
//   price: 17,
//   image: "https://i.ebayimg.com/00/s/MTYwMFgxMDM4/z/IgYAAOSwBr1kXLCG/$_57.JPG?set_id=880000500F"
// },
// {
//   id: 34,
//   name: "The Avengers",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
// },
// {
//   id: 35,
//   name: "Captain Marvel",
//   price: 14,
//   image: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg"
// },
// {
//   id: 36,
//   name: "Ant-Man",
//   price: 13,
//   image: "https://image.tmdb.org/t/p/w500/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg"
// },
// {
//   id: 37,
//   name: "Ant-Man and the Wasp",
//   price: 14,
//   image: "https://image.tmdb.org/t/p/w500/eivQmS3wqzqnQWILHLc4FsEfcXP.jpg"
// },
// {
//   id: 38,
//   name: "Shazam!",
//   price: 14,
//   image: "https://m.media-amazon.com/images/I/91jQHUaeY0L._AC_UF894,1000_QL80_.jpg"
// },
// {
//   id: 39,
//   name: "Wonder Woman",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg"
// },
// {
//   id: 40,
//   name: "Wonder Woman 1984",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
// },
// {
//   id: 41,
//   name: "The Suicide Squad",
//   price: 16,
//   image: "https://image.tmdb.org/t/p/w500/iCi4c4FvVdbaU1t8poH1gvzT6xM.jpg"
// },
// {
//   id: 42,
//   name: "Black Widow",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg"
// },
// {
//   id: 43,
//   name: "Eternals",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg"
// },
// {
//   id: 44,
//   name: "Doctor Strange",
//   price: 14,
//   image: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg"
// },
// {
//   id: 45,
//   name: "Thor: Ragnarok",
//   price: 16,
//   image: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
// },
// {
//   id: 46,
//   name: "Black Panther",
//   price: 15,
//   image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
// },
// {
//   id: 47,
//   name: "Jurassic World",
//   price: 15,
//   image: "https://m.media-amazon.com/images/M/MV5BZGExMWU2NWMtNzczYi00NjQ4LTk2YzctZGZkYmRmMDdhMjllXkEyXkFqcGc@._V1_.jpg"
// },
// {
//   id: 48,
//   name: "Jurassic World Dominion",
//   price: 16,
//   image: "https://www.tallengestore.com/cdn/shop/products/JurassicParkDominion-HollywoodDinosaurMoviePoster_5068f000-e94d-4026-b4e8-e2b9ef66448d.jpg?v=1648215461"
// },
// {
//   id: 49,
//   name: "Transformers: Rise of the Beasts",
//   price: 16,
//   image: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg"
// },
// {
//   id: 50,
//   name: "Godzilla x Kong: The New Empire",
//   price: 18,
//   image: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg"
// }
// ];

// export default function App() {
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [ticketCount, setTicketCount] = useState(1);
//   const [showtime, setShowtime] = useState("10:00 AM");
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [currentView, setCurrentView] = useState("movies");

//   const openBookingModal = (movie) => {
//     setSelectedMovie(movie);
//     setTicketCount(1);
//     setShowtime("10:00 AM");
//     setError("");
//   };

//   const closeBookingModal = () => {
//     setSelectedMovie(null);
//     setError("");
//   };

//   const handleBooking = () => {
//     if (!selectedMovie) return;

//     const validTicketCount = Number(ticketCount);

//     if (!Number.isInteger(validTicketCount) || validTicketCount < 1) {
//       setError("Please select at least one ticket.");
//       return;
//     }

//     setOrders((prevOrders) => [
//       ...prevOrders,
//       {
//         movie: selectedMovie.name,
//         tickets: validTicketCount,
//         showtime,
//         total: validTicketCount * selectedMovie.price,
//       },
//     ]);

//     setSuccessMessage(`Booking confirmed for ${selectedMovie.name}!`);
//     setCurrentView("bookings");
//     closeBookingModal();
//   };

//   return (
//     <div className="app-shell">
//       <nav className="top-nav">
//         <button type="button" className="nav-link" onClick={() => setCurrentView("movies")}>Movies</button>
//         <button type="button" className="nav-link" onClick={() => setCurrentView("bookings")}>My Bookings</button>
//       </nav>

//       {currentView === "movies" ? (
//         <>
//           {successMessage && <div className="success-banner">{successMessage}</div>}

//           <div className="hero">
//             <h1>🎬 Movie Ticket Booking</h1>
//             <p>Choose a movie, pick a show time, and confirm your booking in seconds.</p>
//           </div>

//           <section id="movies">
//             <div className="movie-list">
//               {movies.map((movie) => (
//                 <div className="card" key={movie.id}>
//                   <img src={movie.image} alt={movie.name} className="poster" />

//                   <div className="card-content">
//                     <h2 className="card-title">{movie.name}</h2>
//                     <span className="price-pill">${movie.price} / ticket</span>
//                     <button type="button" className="book-btn" onClick={() => openBookingModal(movie)}>
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </>
//       ) : (
//         <section id="bookings" style={{ marginTop: 20 }}>
//           <div className="hero">
//             <h1>🎟️ My Bookings</h1>
//             <p>Here are all the tickets you have booked.</p>
//           </div>

//           {orders.length === 0 ? (
//             <div className="order-card">No bookings yet. Pick a movie and confirm your ticket.</div>
//           ) : (
//             orders.map((order, index) => (
//               <div key={index} className="order-card">
//                 <p><b>Movie:</b> {order.movie}</p>
//                 <p><b>Tickets:</b> {order.tickets}</p>
//                 <p><b>Show:</b> {order.showtime}</p>
//                 <p><b>Total:</b> ${order.total}</p>
//               </div>
//             ))
//           )}
//         </section>
//       )}

//       {selectedMovie && (
//         <div className="modal-backdrop" onClick={closeBookingModal}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <button type="button" className="close-btn" onClick={closeBookingModal}>
//               ✖
//             </button>

//             <h2>{selectedMovie.name}</h2>
//             <p>Price: ${selectedMovie.price} per ticket</p>

//             <label htmlFor="ticket-count">Tickets</label>
//             <input
//               id="ticket-count"
//               type="number"
//               min="1"
//               value={ticketCount}
//               onChange={(e) => setTicketCount(e.target.value)}
//             />

//             <label htmlFor="showtime-select">Show Time</label>
//             <select
//               id="showtime-select"
//               value={showtime}
//               onChange={(e) => setShowtime(e.target.value)}
//             >
//               <option>10:00 AM</option>
//               <option>1:00 PM</option>
//               <option>4:00 PM</option>
//               <option>7:00 PM</option>
//             </select>

//             {error && <p className="error">{error}</p>}

//             <button type="button" className="submit-btn" onClick={handleBooking}>
//               Confirm Booking
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import { useState } from "react";

// CSS inside same file
const styles = `
:root {
  color-scheme: dark;
}

body {
  margin:0;
  font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
  background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 45%,#020617 100%);
  color:#f8fafc;
}

*{
  box-sizing:border-box;
}

.app-shell{
  max-width:1400px;
  margin:auto;
  padding:32px 20px 70px;
}

/* Floating Toast Notification */
.success-toast {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  background: #16a34a;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(22, 163, 74, 0.4);
  animation: slideDownToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideDownToast {
  from { top: -50px; opacity: 0; }
  to { top: 40px; opacity: 1; }
}

.top-nav{
  position:sticky;
  top:0;
  z-index:900;
  display:flex;
  justify-content:flex-end;
  gap:12px;
  padding:12px 16px;
  margin-bottom:24px;
  background:rgba(2, 6, 23, 0.8);
  backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,0.12);
  border-radius:999px;
}

.nav-link{
  text-decoration:none;
  color:#f8fafc;
  font-weight:700;
  padding:8px 14px;
  border-radius:999px;
  transition:background .2s ease;
  background:transparent;
  border:none;
  cursor:pointer;
}

.nav-link:hover{
  background:rgba(255,255,255,0.16);
}

.hero{
  text-align:center;
  margin-bottom:34px;
}

.hero h1{
  margin:0 0 10px;
  font-size:2.6rem;
  letter-spacing:0.02em;
}

.hero p{
  margin:0 auto;
  max-width:700px;
  color:#dbeafe;
  font-size:1rem;
}

.movie-list{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:24px;
}

.card{
  display:flex;
  flex-direction:column;
  background:rgba(255,255,255,0.96);
  color:#111827;
  border-radius:22px;
  overflow:hidden;
  box-shadow:0 20px 40px rgba(15,23,42,0.25);
  transition:transform .25s ease, box-shadow .25s ease;
}

.card:hover{
  transform:translateY(-6px);
  box-shadow:0 24px 45px rgba(15,23,42,0.3);
}

.poster{
  width:100%;
  height:320px;
  object-fit:cover;
  object-position:center;
}

.card-content{
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:16px 16px 20px;
  flex:1;
}

.card-title{
  margin:0;
  font-size:1.05rem;
  color:#111827;
}

.price-pill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:fit-content;
  padding:7px 11px;
  border-radius:999px;
  background:#dbeafe;
  color:#1d4ed8;
  font-weight:700;
  font-size:0.92rem;
}

button{
  font:inherit;
  border:none;
  border-radius:10px;
  cursor:pointer;
  transition:transform .2s ease, box-shadow .2s ease;
}

button:hover{
  transform:translateY(-1px);
}

.book-btn,
.submit-btn{
  width:100%;
  padding:11px 14px;
  background:linear-gradient(135deg,#2563eb,#1d4ed8);
  color:white;
  box-shadow:0 10px 20px rgba(37,99,235,0.2);
}

.cancel-btn{
  background:#ef4444;
  color:white;
  padding:12px 24px;
  font-weight:600;
  margin-top: 16px;
  font-size: 1rem;
  width: fit-content;
}

.close-btn{
  background:#ef4444;
  color:white;
  padding:8px 10px;
  float:right;
}

.modal-backdrop{
  position:fixed;
  inset:0;
  z-index:1000;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;
  background:rgba(2,6,23,0.72);
}

.modal{
  width:min(100%, 480px);
  background:white;
  color:#111827;
  padding:22px;
  border-radius:18px;
  box-shadow:0 20px 45px rgba(0,0,0,0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.modal h2{
  margin:8px 0 16px;
}

.modal label{
  display:block;
  margin-top:10px;
  font-weight:600;
}

.modal input,
.modal select{
  width:100%;
  margin:8px 0 16px;
  padding:10px 12px;
  border:1px solid #d1d5db;
  border-radius:10px;
}

/* Seat Map Styles */
.seat-map-container {
  background: #f1f5f9;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.screen {
  background: #94a3b8;
  height: 25px;
  width: 100%;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.seats-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.seat-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.row-label {
  width: 20px;
  font-weight: 700;
  color: #64748b;
  font-size: 0.9rem;
}

.seat {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #cbd5e1;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seat:hover:not(.booked) {
  background: #94a3b8;
  transform: scale(1.1);
}

.seat.selected {
  background: #2563eb;
  color: white;
  box-shadow: 0 0 10px rgba(37,99,235,0.4);
}

.seat.booked {
  background: #475569;
  cursor: not-allowed;
  opacity: 0.4;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.error{
  margin:0 0 12px;
  color:#dc2626;
  font-weight:600;
}

/* Redesigned Bookings Page CSS */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.order-card{
  background:rgba(255,255,255,0.96);
  color:#111827;
  border-radius:24px;
  overflow: hidden;
  box-shadow:0 15px 35px rgba(2,6,23,0.25);
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.order-poster {
  width: 220px;
  object-fit: cover;
  flex-shrink: 0;
}

.order-content {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.order-details h2 {
  margin: 0 0 16px 0;
  font-size: 1.8rem;
  color: #1e293b;
}

.order-details p {
  margin: 8px 0;
  font-size: 1.1rem;
  color: #334155;
}

.order-details b {
  color: #0f172a;
}

.seats-badge {
  display: inline-block;
  background: #e2e8f0;
  color: #0f172a;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 6px;
  margin-bottom: 6px;
}

.empty-bookings {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  font-size: 1.25rem;
  color: #e2e8f0;
}

@media (max-width: 768px) {
  .order-card {
    flex-direction: column;
  }
  .order-poster {
    width: 100%;
    height: 250px;
  }
}
`;

if (!document.getElementById("app-style")) {
  const style = document.createElement("style");
  style.id = "app-style";
  style.innerHTML = styles;
  document.head.appendChild(style);
}

// Complete 50 movies array
const movies = [
  { id: 1, name: "Avengers: Endgame", price: 12, image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
  { id: 2, name: "Spider-Man: No Way Home", price: 15, image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
  { id: 3, name: "Avatar: The Way of Water", price: 18, image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
  { id: 4, name: "The Batman", price: 14, image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: 5, name: "Interstellar", price: 13, image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 6, name: "Joker", price: 16, image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
  { id: 7, name: "Dune", price: 17, image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id: 8, name: "Inception", price: 13, image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id: 9, name: "Oppenheimer", price: 18, image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
  { id: 10, name: "Barbie", price: 14, image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
  { id: 11, name: "Top Gun: Maverick", price: 16, image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
  { id: 12, name: "Mission: Impossible - Dead Reckoning", price: 17, image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" },
  { id: 13, name: "Doctor Strange in the Multiverse of Madness", price: 15, image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg" },
  { id: 14, name: "Black Panther: Wakanda Forever", price: 15, image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg" },
  { id: 15, name: "Thor: Love and Thunder", price: 14, image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg" },
  { id: 16, name: "The Flash", price: 13, image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg" },
  { id: 17, name: "John Wick: Chapter 4", price: 17, image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
  { id: 18, name: "Fast X", price: 15, image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg" },
  { id: 19, name: "The Super Mario Bros. Movie", price: 12, image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" },
  { id: 20, name: "Guardians of the Galaxy Vol. 3", price: 16, image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg" },
  { id: 21, name: "The Dark Knight", price: 18, image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 22, name: "Iron Man", price: 14, image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" },
  { id: 23, name: "Captain America: Civil War", price: 15, image: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg" },
  { id: 24, name: "Black Adam", price: 16, image: "https://image.tmdb.org/t/p/w500/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg" },
  { id: 25, name: "Aquaman", price: 15, image: "https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg" },
  { id: 26, name: "The Lion King", price: 13, image: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg" },
  { id: 27, name: "Frozen II", price: 12, image: "https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg" },
  { id: 28, name: "The Matrix Resurrections", price: 16, image: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg" },
  { id: 29, name: "Venom: Let There Be Carnage", price: 15, image: "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg" },
  { id: 30, name: "Minions: The Rise of Gru", price: 12, image: "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" },
  { id: 31, name: "Deadpool", price: 15, image: "https://image.tmdb.org/t/p/original/wYmtZIZZRa56UV2Lurei6w8PjSB.jpg" },
  { id: 32, name: "Deadpool 2", price: 16, image: "https://media-cache.cinematerial.com/p/500x/qcjprk2e/deadpool-2-movie-poster.jpg?v=1540913690" },
  { id: 33, name: "Logan", price: 17, image: "https://i.ebayimg.com/00/s/MTYwMFgxMDM4/z/IgYAAOSwBr1kXLCG/$_57.JPG?set_id=880000500F" },
  { id: 34, name: "The Avengers", price: 15, image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
  { id: 35, name: "Captain Marvel", price: 14, image: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg" },
  { id: 36, name: "Ant-Man", price: 13, image: "https://image.tmdb.org/t/p/w500/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg" },
  { id: 37, name: "Ant-Man and the Wasp", price: 14, image: "https://image.tmdb.org/t/p/w500/eivQmS3wqzqnQWILHLc4FsEfcXP.jpg" },
  { id: 38, name: "Shazam!", price: 14, image: "https://m.media-amazon.com/images/I/91jQHUaeY0L._AC_UF894,1000_QL80_.jpg" },
  { id: 39, name: "Wonder Woman", price: 15, image: "https://image.tmdb.org/t/p/w500/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg" },
  { id: 40, name: "Wonder Woman 1984", price: 15, image: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" },
  { id: 41, name: "The Suicide Squad", price: 16, image: "https://image.tmdb.org/t/p/w500/iCi4c4FvVdbaU1t8poH1gvzT6xM.jpg" },
  { id: 42, name: "Black Widow", price: 15, image: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg" },
  { id: 43, name: "Eternals", price: 15, image: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg" },
  { id: 44, name: "Doctor Strange", price: 14, image: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg" },
  { id: 45, name: "Thor: Ragnarok", price: 16, image: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg" },
  { id: 46, name: "Black Panther", price: 15, image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg" },
  { id: 47, name: "Jurassic World", price: 15, image: "https://m.media-amazon.com/images/M/MV5BZGExMWU2NWMtNzczYi00NjQ4LTk2YzctZGZkYmRmMDdhMjllXkEyXkFqcGc@._V1_.jpg" },
  { id: 48, name: "Jurassic World Dominion", price: 16, image: "https://www.tallengestore.com/cdn/shop/products/JurassicParkDominion-HollywoodDinosaurMoviePoster_5068f000-e94d-4026-b4e8-e2b9ef66448d.jpg?v=1648215461" },
  { id: 49, name: "Transformers: Rise of the Beasts", price: 16, image: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg" },
  { id: 50, name: "Godzilla x Kong: The New Empire", price: 18, image: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg" }
];

const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;
const USD_TO_INR_RATE = 95.27;

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtime, setShowtime] = useState("10:00 AM");
  const [customerName, setCustomerName] = useState("");
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [globalBookedSeats, setGlobalBookedSeats] = useState({});
  
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentView, setCurrentView] = useState("movies");

  // Helper to show a pop-up toast that auto-hides after 4 seconds
  const showToast = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000); 
  };

  const openBookingModal = (movie) => {
    setSelectedMovie(movie);
    setShowtime("10:00 AM");
    setCustomerName("");
    setSelectedSeats([]);
    setError("");
  };

  const closeBookingModal = () => {
    setSelectedMovie(null);
    setError("");
  };

  const handleShowtimeChange = (e) => {
    setShowtime(e.target.value);
    setSelectedSeats([]); 
  };

  const getSessionKey = (movieId, time) => `${movieId}-${time}`;

  const handleSeatClick = (seatId) => {
    const sessionKey = getSessionKey(selectedMovie.id, showtime);
    const isBooked = (globalBookedSeats[sessionKey] || []).includes(seatId);

    if (isBooked) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (!selectedMovie) return;

    if (!customerName.trim()) {
      setError("Please enter your name before booking.");
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat.");
      return;
    }

    const orderId = Date.now().toString();
    const sessionKey = getSessionKey(selectedMovie.id, showtime);
    
    const priceInINR = selectedMovie.price * USD_TO_INR_RATE;
    const totalAmount = (selectedSeats.length * priceInINR).toFixed(2);

    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: orderId,
        customerName: customerName.trim(),
        movieId: selectedMovie.id,
        movie: selectedMovie.name,
        movieImage: selectedMovie.image, // Captured banner image for the ticket
        seats: selectedSeats,
        showtime,
        total: totalAmount,
      },
    ]);

    setGlobalBookedSeats((prev) => ({
      ...prev,
      [sessionKey]: [...(prev[sessionKey] || []), ...selectedSeats]
    }));

    // Trigger the floating success toast and close modal immediately
    showToast(`✅ Ticket booked successfully for ${selectedMovie.name}!`);
    closeBookingModal();
  };

  const handleCancelTicket = (orderToCancel) => {
    const sessionKey = getSessionKey(orderToCancel.movieId, orderToCancel.showtime);
    
    setGlobalBookedSeats((prev) => ({
      ...prev,
      [sessionKey]: prev[sessionKey].filter(seat => !orderToCancel.seats.includes(seat))
    }));

    setOrders(orders.filter(order => order.id !== orderToCancel.id));
    
    // Trigger the floating cancel toast
    showToast(`🗑️ Ticket for ${orderToCancel.movie} cancelled successfully.`);
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const renderSeatMap = () => {
    if (!selectedMovie) return null;
    
    const sessionKey = getSessionKey(selectedMovie.id, showtime);
    const currentlyBooked = globalBookedSeats[sessionKey] || [];

    return (
      <div className="seat-map-container">
        <div className="screen">SCREEN THIS WAY</div>
        <div className="seats-grid">
          {SEAT_ROWS.map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                const seatId = `${row}${i + 1}`;
                const isBooked = currentlyBooked.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                let seatClass = "seat";
                if (isBooked) seatClass += " booked";
                else if (isSelected) seatClass += " selected";

                return (
                  <div 
                    key={seatId} 
                    className={seatClass}
                    onClick={() => handleSeatClick(seatId)}
                    title={seatId}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-box" style={{background: "#cbd5e1"}}></div> Available
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background: "#2563eb"}}></div> Selected
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background: "#475569"}}></div> Booked
          </div>
        </div>
      </div>
    );
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app-shell">
      {/* Global Success Toast Notification - Displays regardless of current page */}
      {successMessage && (
        <div className="success-toast">
          {successMessage}
        </div>
      )}

      <nav className="top-nav">
        <button type="button" className="nav-link" onClick={() => handleNavClick("movies")}>Movies</button>
        <button type="button" className="nav-link" onClick={() => handleNavClick("bookings")}>My Bookings</button>
      </nav>

      {currentView === "movies" ? (
        <>
          <div className="hero">
            <h1>🎬 Movie Ticket Booking</h1>
            <p>Choose a movie, select your seats, and confirm your booking.</p>
          </div>

          <section id="movies">
            <div className="movie-list">
              {movies.map((movie) => {
                const priceInINR = movie.price * USD_TO_INR_RATE;
                return (
                  <div className="card" key={movie.id}>
                    <img src={movie.image} alt={movie.name} className="poster" />

                    <div className="card-content">
                      <h2 className="card-title">{movie.name}</h2>
                      <span className="price-pill">{formatINR(priceInINR)} / ticket</span>
                      
                      <button type="button" className="book-btn" onClick={() => openBookingModal(movie)}>
                        Book Ticket
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <section id="bookings" style={{ marginTop: 20 }}>
          <div className="hero">
            <h1>🎟️ My Bookings</h1>
            <p>Manage all your purchased tickets here.</p>
          </div>

          {orders.length === 0 ? (
            <div className="empty-bookings">
              🍿 No bookings yet. Go back to Movies and pick your favorite show!
            </div>
          ) : (
            <div className="bookings-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  {/* Displaying Movie Banner inside the ticket */}
                  <img src={order.movieImage} alt={order.movie} className="order-poster" />
                  
                  <div className="order-content">
                    <div className="order-details">
                      <h2>{order.movie}</h2>
                      <p><b>Booked by:</b> {order.customerName}</p>
                      <p><b>Showtime:</b> {order.showtime}</p>
                      <p><b>Total Amount Paid:</b> {formatINR(order.total)}</p>
                      <p style={{ marginTop: '12px' }}>
                        <b>Seats:</b><br /> 
                        {order.seats.map(seat => (
                          <span key={seat} className="seats-badge">{seat}</span>
                        ))}
                      </p>
                    </div>
                    <button type="button" className="cancel-btn" onClick={() => handleCancelTicket(order)}>
                      Cancel Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {selectedMovie && (
        <div className="modal-backdrop" onClick={closeBookingModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-btn" onClick={closeBookingModal}>
              ✖
            </button>

            <h2>{selectedMovie.name}</h2>
            <p style={{marginBottom: 16}}>Price: <b>{formatINR(selectedMovie.price * USD_TO_INR_RATE)}</b> per seat</p>

            <label htmlFor="customer-name">Name</label>
            <input
              id="customer-name"
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label htmlFor="showtime-select">Select Show Time</label>
            <select
              id="showtime-select"
              value={showtime}
              onChange={handleShowtimeChange}
            >
              <option>10:00 AM</option>
              <option>1:00 PM</option>
              <option>4:00 PM</option>
              <option>7:00 PM</option>
            </select>

            {renderSeatMap()}

            {error && <p className="error">{error}</p>}

            <button type="button" className="submit-btn" onClick={handleBooking}>
              Pay {formatINR(selectedSeats.length * selectedMovie.price * USD_TO_INR_RATE)} • Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}