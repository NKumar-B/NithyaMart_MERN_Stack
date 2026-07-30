import React, { useEffect, useState } from "react";

// CSS inside same file
const styles = `
body {
  margin:0;
  font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
  background:radial-gradient(circle at top,#1e3a8a,#030712 70%);
  color:#f8fafc;
}

*{
  box-sizing:border-box;
}

.app-shell{
  max-width:1300px;
  margin:auto;
  padding:32px 20px 60px;
}

.hero{
  text-align:center;
  margin-bottom:32px;
}

.hero h1{
  margin:0 0 10px;
  font-size:2.6rem;
}

.hero p{
  color:#dbeafe;
}

.movie-list{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:24px;
}

.card{
  background:white;
  color:#111827;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 15px 30px rgba(0,0,0,.2);
  transition:.3s;
}

.card:hover{
  transform:translateY(-6px);
}

.poster{
  width:100%;
  height:320px;
  object-fit:cover;
}

.card-content{
  padding:16px;
}

button{
  margin-top:10px;
  width:100%;
  padding:10px;
  border:none;
  border-radius:8px;
  cursor:pointer;
  background:#2563eb;
  color:white;
}

.modal-backdrop{
  position:fixed;
  inset:0;
  display:flex;
  justify-content:center;
  align-items:center;
  background:rgba(0,0,0,.7);
}

.modal{
  background:white;
  color:black;
  width:350px;
  padding:20px;
  border-radius:15px;
}

.modal input,
.modal select{
  width:100%;
  margin:8px 0;
  padding:10px;
}

.close-btn{
  float:right;
  background:red;
}

.submit-btn{
  width:100%;
}

.error{
  color:red;
}
`;

if (!document.getElementById("app-style")) {
  const style = document.createElement("style");
  style.id = "app-style";
  style.innerHTML = styles;
  document.head.appendChild(style);
}

// Paste your complete movies array here
const movies = [
{
    id: 1,
    name: "Avengers: Endgame",
    price: 12,
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    id: 2,
    name: "Spider-Man: No Way Home",
    price: 15,
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    id: 3,
    name: "Avatar: The Way of Water",
    price: 18,
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
  },
  {
    id: 4,
    name: "The Batman",
    price: 14,
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },
  {
    id: 5,
    name: "Interstellar",
    price: 13,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: 6,
    name: "Joker",
    price: 16,
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    id: 7,
    name: "Dune",
    price: 17,
    image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
  },
  {
    id: 8,
    name: "Inception",
    price: 13,
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 9,
    name: "Oppenheimer",
    price: 18,
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
  },
  {
    id: 10,
    name: "Barbie",
    price: 14,
    image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
  },
  {
    id: 11,
    name: "Top Gun: Maverick",
    price: 16,
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
  },
  {
    id: 12,
    name: "Mission: Impossible - Dead Reckoning",
    price: 17,
    image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg"
  },
  {
    id: 13,
    name: "Doctor Strange in the Multiverse of Madness",
    price: 15,
    image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
  },
  {
    id: 14,
    name: "Black Panther: Wakanda Forever",
    price: 15,
    image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg"
  },
  {
    id: 15,
    name: "Thor: Love and Thunder",
    price: 14,
    image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
  },
  {
    id: 16,
    name: "The Flash",
    price: 13,
    image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
  },
  {
    id: 17,
    name: "John Wick: Chapter 4",
    price: 17,
    image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
  },
  {
    id: 18,
    name: "Fast X",
    price: 15,
    image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg"
  },
  {
    id: 19,
    name: "The Super Mario Bros. Movie",
    price: 12,
    image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
  },
  {
    id: 20,
    name: "Guardians of the Galaxy Vol. 3",
    price: 16,
    image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
  },
  {
  id: 21,
  name: "The Dark Knight",
  price: 18,
  image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
},
{
  id: 22,
  name: "Iron Man",
  price: 14,
  image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
},
{
  id: 23,
  name: "Captain America: Civil War",
  price: 15,
  image: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg"
},
{
  id: 24,
  name: "Black Adam",
  price: 16,
  image: "https://image.tmdb.org/t/p/w500/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg"
},
{
  id: 25,
  name: "Aquaman",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg"
},
{
  id: 26,
  name: "The Lion King",
  price: 13,
  image: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"
},
{
  id: 27,
  name: "Frozen II",
  price: 12,
  image: "https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg"
},
{
  id: 28,
  name: "The Matrix Resurrections",
  price: 16,
  image: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg"
},
{
  id: 29,
  name: "Venom: Let There Be Carnage",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg"
},
{
  id: 30,
  name: "Minions: The Rise of Gru",
  price: 12,
  image: "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg"
},
{
  id: 31,
  name: "Deadpool",
  price: 15,
  image: "https://image.tmdb.org/t/p/original/wYmtZIZZRa56UV2Lurei6w8PjSB.jpg"
},
{
  id: 32,
  name: "Deadpool 2",
  price: 16,
  image: "https://media-cache.cinematerial.com/p/500x/qcjprk2e/deadpool-2-movie-poster.jpg?v=1540913690"
},
{
  id: 33,
  name: "Logan",
  price: 17,
  image: "https://i.ebayimg.com/00/s/MTYwMFgxMDM4/z/IgYAAOSwBr1kXLCG/$_57.JPG?set_id=880000500F"
},
{
  id: 34,
  name: "The Avengers",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
},
{
  id: 35,
  name: "Captain Marvel",
  price: 14,
  image: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg"
},
{
  id: 36,
  name: "Ant-Man",
  price: 13,
  image: "https://image.tmdb.org/t/p/w500/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg"
},
{
  id: 37,
  name: "Ant-Man and the Wasp",
  price: 14,
  image: "https://image.tmdb.org/t/p/w500/eivQmS3wqzqnQWILHLc4FsEfcXP.jpg"
},
{
  id: 38,
  name: "Shazam!",
  price: 14,
  image: "https://m.media-amazon.com/images/I/91jQHUaeY0L._AC_UF894,1000_QL80_.jpg"
},
{
  id: 39,
  name: "Wonder Woman",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg"
},
{
  id: 40,
  name: "Wonder Woman 1984",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
},
{
  id: 41,
  name: "The Suicide Squad",
  price: 16,
  image: "https://image.tmdb.org/t/p/w500/iCi4c4FvVdbaU1t8poH1gvzT6xM.jpg"
},
{
  id: 42,
  name: "Black Widow",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg"
},
{
  id: 43,
  name: "Eternals",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg"
},
{
  id: 44,
  name: "Doctor Strange",
  price: 14,
  image: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg"
},
{
  id: 45,
  name: "Thor: Ragnarok",
  price: 16,
  image: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
},
{
  id: 46,
  name: "Black Panther",
  price: 15,
  image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
},
{
  id: 47,
  name: "Jurassic World",
  price: 15,
  image: "https://m.media-amazon.com/images/M/MV5BZGExMWU2NWMtNzczYi00NjQ4LTk2YzctZGZkYmRmMDdhMjllXkEyXkFqcGc@._V1_.jpg"
},
{
  id: 48,
  name: "Jurassic World Dominion",
  price: 16,
  image: "https://www.tallengestore.com/cdn/shop/products/JurassicParkDominion-HollywoodDinosaurMoviePoster_5068f000-e94d-4026-b4e8-e2b9ef66448d.jpg?v=1648215461"
},
{
  id: 49,
  name: "Transformers: Rise of the Beasts",
  price: 16,
  image: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg"
},
{
  id: 50,
  name: "Godzilla x Kong: The New Empire",
  price: 18,
  image: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg"
}
];

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [showtime, setShowtime] = useState("10:00 AM");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const handleBooking = () => {
    if (ticketCount < 1) {
      setError("Please select at least one ticket.");
      return;
    }

    setOrders([
      ...orders,
      {
        movie: selectedMovie.name,
        tickets: ticketCount,
        showtime,
        total: ticketCount * selectedMovie.price,
      },
    ]);

    setSelectedMovie(null);
    setError("");
  };

  return (
    <div className="app-shell">
      <div className="hero">
        <h1>🎬 Movie Ticket Booking</h1>
        <p>Select your favorite movie and book your tickets.</p>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <img
              src={movie.image}
              alt={movie.name}
              className="poster"
            />

            <div className="card-content">
              <h2>{movie.name}</h2>
              <p>${movie.price} per ticket</p>

              <button onClick={() => setSelectedMovie(movie)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal-backdrop">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setSelectedMovie(null)}
            >
              ✖
            </button>

            <h2>{selectedMovie.name}</h2>

            <label>Tickets</label>

            <input
              type="number"
              min="1"
              value={ticketCount}
              onChange={(e) =>
                setTicketCount(Number(e.target.value))
              }
            />

            <label>Show Time</label>

            <select
              value={showtime}
              onChange={(e) => setShowtime(e.target.value)}
            >
              <option>10:00 AM</option>
              <option>1:00 PM</option>
              <option>4:00 PM</option>
              <option>7:00 PM</option>
            </select>

            {error && <p className="error">{error}</p>}

            <button
              className="submit-btn"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Bookings</h2>

          {orders.map((order, index) => (
            <div
              key={index}
              style={{
                background: "white",
                color: "black",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <p>
                <b>Movie:</b> {order.movie}
              </p>

              <p>
                <b>Tickets:</b> {order.tickets}
              </p>

              <p>
                <b>Show:</b> {order.showtime}
              </p>

              <p>
                <b>Total:</b> ${order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}