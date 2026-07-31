 import React, { useState } from "react";
import "./Shoes.css";

function Shoes() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");


  const [shoes] = useState([

    {
      id:1,
      brand:"Nike",
      name:"Air Max 270",
      category:"Running",
      price:"₹12,999",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
      id:2,
      brand:"Nike",
      name:"Nike Air Force 1",
      category:"Casual",
      price:"₹8,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },

    {
      id:3,
      brand:"Nike",
      name:"Nike Pegasus 41",
      category:"Running",
      price:"₹11,999",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:4,
      brand:"Adidas",
      name:"Ultraboost Light",
      category:"Running",
      price:"₹15,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:5,
      brand:"Adidas",
      name:"Adidas Superstar",
      category:"Casual",
      price:"₹7,999",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:6,
      brand:"Adidas",
      name:"Adidas Forum Low",
      category:"Lifestyle",
      price:"₹9,499",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:7,
      brand:"Puma",
      name:"Puma RS-X",
      category:"Sports",
      price:"₹9,999",
      rating:"4.6",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:8,
      brand:"Puma",
      name:"Puma Future Rider",
      category:"Casual",
      price:"₹6,999",
      rating:"4.5",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:9,
      brand:"Jordan",
      name:"Air Jordan 1 Retro",
      category:"Basketball",
      price:"₹18,999",
      rating:"5.0",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:10,
      brand:"Jordan",
      name:"Jordan Stay Loyal",
      category:"Basketball",
      price:"₹13,499",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },

        {
      id:11,
      brand:"New Balance",
      name:"574 Classic",
      category:"Lifestyle",
      price:"₹8,499",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:12,
      brand:"New Balance",
      name:"Fresh Foam 1080",
      category:"Running",
      price:"₹14,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:13,
      brand:"ASICS",
      name:"Gel Kayano 31",
      category:"Running",
      price:"₹16,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:14,
      brand:"ASICS",
      name:"Gel Nimbus",
      category:"Running",
      price:"₹15,499",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },


    {
      id:15,
      brand:"Reebok",
      name:"Nano X4 Training",
      category:"Training",
      price:"₹10,999",
      rating:"4.6",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:16,
      brand:"Converse",
      name:"Chuck Taylor All Star",
      category:"Casual",
      price:"₹5,999",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:17,
      brand:"Vans",
      name:"Old Skool",
      category:"Casual",
      price:"₹6,499",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:18,
      brand:"Woodland",
      name:"Leather Outdoor Boots",
      category:"Boots",
      price:"₹4,999",
      rating:"4.5",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:19,
      brand:"Campus",
      name:"Campus Running Pro",
      category:"Sports",
      price:"₹2,499",
      rating:"4.4",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },


    {
      id:20,
      brand:"Puma x Virat Kohli",
      name:"One8 Virat Kohli Signature Shoes",
      category:"Celebrity Collection",
      price:"₹8,999",
      rating:"5.0",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:21,
      brand:"Puma x Virat Kohli",
      name:"One8 Training Edition",
      category:"Training",
      price:"₹6,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:22,
      brand:"Puma x Virat Kohli",
      name:"One8 Street Style",
      category:"Lifestyle",
      price:"₹7,499",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:23,
      brand:"Skechers",
      name:"Go Walk 7",
      category:"Walking",
      price:"₹5,999",
      rating:"4.5",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:24,
      brand:"Fila",
      name:"Fila Disruptor",
      category:"Lifestyle",
      price:"₹6,999",
      rating:"4.6",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:25,
      brand:"Under Armour",
      name:"UA HOVR Phantom",
      category:"Running",
      price:"₹12,499",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:26,
      brand:"Fila",
      name:"Fila Ray Tracer",
      category:"Lifestyle",
      price:"₹6,499",
      rating:"4.6",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:27,
      brand:"Brooks",
      name:"Brooks Ghost 16",
      category:"Running",
      price:"₹13,999",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:28,
      brand:"Hoka",
      name:"Hoka Clifton 9",
      category:"Running",
      price:"₹14,499",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:29,
      brand:"Crocs",
      name:"Crocs Classic Clog",
      category:"Casual",
      price:"₹3,999",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:30,
      brand:"Nike",
      name:"Nike Dunk Low",
      category:"Lifestyle",
      price:"₹10,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },


    {
      id:31,
      brand:"Adidas",
      name:"Adidas Yeezy Style",
      category:"Premium",
      price:"₹19,999",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:32,
      brand:"Puma",
      name:"Puma Velocity Nitro",
      category:"Running",
      price:"₹11,499",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:33,
      brand:"Jordan",
      name:"Jordan Luka 3",
      category:"Basketball",
      price:"₹15,999",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:34,
      brand:"Reebok",
      name:"Classic Leather",
      category:"Casual",
      price:"₹7,499",
      rating:"4.6",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:35,
      brand:"Skechers",
      name:"Arch Fit Walker",
      category:"Walking",
      price:"₹6,999",
      rating:"4.7",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:36,
      brand:"Woodland",
      name:"Premium Leather Shoes",
      category:"Boots",
      price:"₹5,999",
      rating:"4.5",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },


    {
      id:37,
      brand:"Campus",
      name:"Campus Max Runner",
      category:"Sports",
      price:"₹2,799",
      rating:"4.4",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },


    {
      id:38,
      brand:"Bata",
      name:"Bata Formal Leather",
      category:"Formal",
      price:"₹3,499",
      rating:"4.5",
      image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },


    {
      id:39,
      brand:"Louis Vuitton",
      name:"LV Trainer Sneakers",
      category:"Luxury",
      price:"₹85,000",
      rating:"5.0",
      image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },


    {
      id:40,
      brand:"Gucci",
      name:"Gucci Ace Sneakers",
      category:"Luxury",
      price:"₹65,000",
      rating:"4.9",
      image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },


    {
      id:41,
      brand:"Balenciaga",
      name:"Triple S Sneakers",
      category:"Luxury",
      price:"₹75,000",
      rating:"4.8",
      image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    },


    {
      id:42,
      brand:"Puma x Virat Kohli",
      name:"One8 Ultimate Cricket Shoes",
      category:"Celebrity Collection",
      price:"₹9,999",
      rating:"5.0",
      image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    }

  ]);


  const filteredShoes = shoes.filter((shoe)=>{

    const matchesSearch =
    shoe.name.toLowerCase().includes(search.toLowerCase()) ||
    shoe.brand.toLowerCase().includes(search.toLowerCase());


    const matchesCategory =
    category === "All" || shoe.category === category;


    return matchesSearch && matchesCategory;

  });


  return (

    <div className="shoes-page">


      <section className="hero">

        <h1>
          Premium Shoes Collection
        </h1>

        <p>
          Choose from world's best brands
        </p>


        <input
          type="text"
          placeholder="Search Shoes..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </section>



      <div className="shoe-grid">


      {
        filteredShoes.map((shoe)=>(

          <div className="shoe-card" key={shoe.id}>


            <img src={shoe.image} alt={shoe.name}/>


            <h3>{shoe.name}</h3>

            <p><b>{shoe.brand}</b></p>

            <span>{shoe.category}</span>


            <h4>{shoe.price}</h4>


            <p>
              ⭐ {shoe.rating}
            </p>


            <button>
              View Details
            </button>


          </div>

        ))
      }


      </div>



      <footer className="footer">


        <h2>
          MALL Shoes Store
        </h2>


        <p>
          Premium footwear collection with top brands.
        </p>


        <div className="footer-links">

          <a href="#">Home</a>
          <a href="#">Shoes</a>
          <a href="#">Brands</a>
          <a href="#">Contact</a>

        </div>


        <div className="footer-bottom">

          © 2026 MALL Shoes Store | All Rights Reserved

        </div>


      </footer>


    </div>

  );

}


export default Shoes;