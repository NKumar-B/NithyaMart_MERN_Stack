import React, { useState } from "react";
import "./Shoes.css";


 function Shoes() {

   const [search, setSearch] = useState("");

const [category, setCategory] = useState("All");

const [cart, setCart] = useState([]);

const [showCart, setShowCart] = useState(false);

const [orderMessage, setOrderMessage] = useState("");

const [cartMessage, setCartMessage] = useState("");
  // Shoe data will be added in Part 2
  
  const [shoes] = useState([

{
 id:2,
 brand:"Nike",
 name:"Nike Air Force 1",
 category:"Men",
 price:"₹10,999",
 rating:"4.9",
 image:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
},

{
 id:3,
 brand:"Nike",
 name:"Nike Pegasus 41",
 category:"Sports",
 price:"₹11,499",
 rating:"4.8",
 image:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"
},

{
 id:4,
 brand:"Adidas",
 name:"Ultraboost Light",
 category:"Sports",
 price:"₹14,999",
 rating:"4.9",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5df5ygxwYBx3e8hFws87i-fmrqQ5lhA8AzDEDfRcSQ&s=10"
},

{
 id:5,
 brand:"Adidas",
 name:"Adidas Superstar",
 category:"Men",
 price:"₹8,999",
 rating:"4.8",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuPKTlhMrOi0sq0cLw4sJtCzlBtVnv5ErbObD9YZU5Pw&s"
},

{
 id:6,
 brand:"Adidas",
 name:"Forum Low",
 category:"Women",
 price:"₹9,499",
 rating:"4.7",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCwiqeEvSZVLfN7UAk9ulWgyHzO5KA02c4sXPy-TwQHg&s=10"
},

{
 id:7,
 brand:"Puma",
 name:"Puma RS-X",
 category:"Men",
 price:"₹9,999",
 rating:"4.7",
 image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
},

{
 id:8,
 brand:"Puma",
 name:"Future Rider",
 category:"Women",
 price:"₹8,499",
 rating:"4.6",
 image:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"
},

{
 id:9,
 brand:"Jordan",
 name:"Air Jordan 1 Retro",
 category:"Men",
 price:"₹18,999",
 rating:"5.0",
 image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500"
},

{
 id:10,
 brand:"Jordan",
 name:"Stay Loyal 3",
 category:"Sports",
 price:"₹13,999",
 rating:"4.8",
 image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
},

{
 id:11,
 brand:"New Balance",
 name:"574 Classic",
 category:"Men",
 price:"₹8,999",
 rating:"4.7",
 image:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500"
},

{
 id:12,
 brand:"New Balance",
 name:"Fresh Foam 1080",
 category:"Sports",
 price:"₹14,499",
 rating:"4.9",
 image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
},

{
 id:13,
 brand:"ASICS",
 name:"Gel Kayano 31",
 category:"Sports",
 price:"₹15,999",
 rating:"4.9",
 image:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"
},

{
 id:14,
 brand:"ASICS",
 name:"Gel Nimbus 27",
 category:"Women",
 price:"₹15,499",
 rating:"4.8",
 image:"https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500"
},

{
 id:15,
 brand:"Reebok",
 name:"Nano X4",
 category:"Sports",
 price:"₹10,499",
 rating:"4.7",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhi-l5hPQZKAIEaZGdS16J9AivPvWAqSrMDoEFJ08Bw&s=10"
},

{
 id:16,
 brand:"Converse",
 name:"Chuck Taylor",
 category:"Men",
 price:"₹6,499",
 rating:"4.8",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpsuc1FeCPD6Rg6TNB-VdlV48HcmACmKR6SuRAT-t3Lg&s=10"
},

{
 id:17,
 brand:"Vans",
 name:"Old Skool",
 category:"Men",
 price:"₹7,499",
 rating:"4.7",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DTk4D2tQZiZjMS9NPboQF-nbBx5fU086avrzyVjvjw&s=10"
},

{
 id:18,
 brand:"Woodland",
 name:"Leather Boots",
 category:"Men",
 price:"₹5,999",
 rating:"4.6",
 image:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500"
},

{
 id:19,
 brand:"Campus",
 name:"OXYFIT Runner",
 category:"Kids",
 price:"₹2,999",
 rating:"4.5",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DTk4D2tQZiZjMS9NPboQF-nbBx5fU086avrzyVjvjw&s=10"
},

{
 id:20,
 brand:"One8",
 name:"Virat Signature",
 category:"Sports",
 price:"₹8,999",
 rating:"4.9",
 image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
},

{
 id:21,
 brand:"Skechers",
 name:"Go Walk 7",
 category:"Women",
 price:"₹6,499",
 rating:"4.7",
 image:"https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500"
},

{
 id:22,
 brand:"Fila",
 name:"Disruptor II",
 category:"Women",
 price:"₹7,499",
 rating:"4.6",
 image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
},

{
 id:23,
 brand:"Under Armour",
 name:"HOVR Phantom",
 category:"Sports",
 price:"₹12,999",
 rating:"4.8",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThIkZfCaHF5aXT6lpjhUxJ8LHwJoAq4TFmg-slsjqTuA&s=10"
},

{
 id:24,
 brand:"Brooks",
 name:"Ghost 16",
 category:"Sports",
 price:"₹13,999",
 rating:"4.9",
 image:"data:image/jpeg;base64,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"
},

{
 id:25,
 brand:"Hoka",
 name:"Clifton 9",
 category:"Sports",
 price:"₹14,999",
 rating:"4.9",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzTVmkLoDRD2SAojG7jky1n3QFZm2YaaA_RvVk8mfPXA&s"
},

{
 id:26,
 brand:"Crocs",
 name:"Classic Clog",
 category:"Kids",
 price:"₹3,499",
 rating:"4.7",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41wqUXxDmW0kIGy8K0kpN9-0g6Ut3cushVyz4XR-vNg&s=10"
},

{
 id:27,
 brand:"Nike",
 name:"Nike Dunk Low",
 category:"Women",
 price:"₹11,499",
 rating:"4.9",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd98Xmw-q05LZlP_HGT4FzC2RZnPfNZoZpCcjXRkpReg&s=10"
},

{
 id:28,
 brand:"Puma",
 name:"Velocity Nitro",
 category:"Sports",
 price:"₹10,999",
 rating:"4.8",
 image:"https://images.unsplash.com/photo-1576672843344-f01907a9d40c?w=500"
},

{
 id:29,
 brand:"Jordan",
 name:"Luka 3",
 category:"Sports",
 price:"₹16,999",
 rating:"4.9",
 image:"https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500"
},

{
 id:30,
 brand:"Reebok",
 name:"Classic Leather",
 category:"Men",
 price:"₹7,999",
 rating:"4.7",
 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnhOcMlH-gEzSDi1HfBgeq2PkDyzwwVuhCSEL77Ls4g&s=10"
}

]);
const addToCart = (shoe) => {

  const alreadyAdded = cart.find(
    (item)=>item.id === shoe.id
  );


  if(!alreadyAdded){

    setCart([...cart, shoe]);


    setCartMessage(
      `✅ ${shoe.name} Added to Cart`
    );


    setTimeout(()=>{

      setCartMessage("");

    },3000);


  }
  else{


    setCartMessage(
      `⚠️ ${shoe.name} Already in Cart`
    );


    setTimeout(()=>{

      setCartMessage("");

    },3000);


  }

};
const removeFromCart = (id)=>{

  setCart(
    cart.filter((item)=>item.id !== id)
  );

};
const placeOrder = ()=>{

  setOrderMessage(
    "🎉 Order Placed Successfully!"
  );

  setCart([]);

};
 
  const filteredShoes = shoes.filter((shoe) => {

    const matchesSearch =
      shoe.name.toLowerCase().includes(search.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || shoe.category === category;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="shoes-page">

      {/* Header */}

      <header className="header">

        <div className="logo">
          👟 SHOES
        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search shoes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
         <div 
className="cart"
onClick={() => setShowCart(true)}
>

🛒Cart

<span>
{cart.length}
</span>

</div> 
        
      </header>
      {
cartMessage &&

<div className="cart-toast">

{cartMessage}

</div>

}

      {/* Hero */}

      <section className="hero">

        <h1>
          Premium Shoe Collection
        </h1>

        <p>
          Find the perfect pair for every occasion.
        </p>

      </section>

      {/* Categories */}

      <div className="categories">

        <button
          className={category === "All" ? "active" : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          className={category === "Men" ? "active" : ""}
          onClick={() => setCategory("Men")}
        >
          Men
        </button>

        <button
          className={category === "Women" ? "active" : ""}
          onClick={() => setCategory("Women")}
        >
          Women
        </button>

        <button
          className={category === "Kids" ? "active" : ""}
          onClick={() => setCategory("Kids")}
        >
          Kids
        </button>

        <button
          className={category === "Sports" ? "active" : ""}
          onClick={() => setCategory("Sports")}
        >
          Sports
        </button>

      </div>
 
      {/* Shoe Grid */}

      <div className="shoe-grid">

        {filteredShoes.map((shoe) => (

          <div className="shoe-card" key={shoe.id}>

            <img
              src={shoe.image}
              alt={shoe.name}
            />

            <h3>{shoe.name}</h3>

            <p className="brand">
              {shoe.brand}
            </p>

            <p className="category">
              {shoe.category}
            </p>

            <div className="price-rating">

              <h4>
                {shoe.price}
              </h4>

              <span>
                ⭐ {shoe.rating}
              </span>

            </div>
<button
onClick={() => addToCart(shoe)}
>
{
cart.some((item)=>item.id===shoe.id)
?
"✓ Added to Cart"
:
"Add to Cart"
}

</button>
            
          </div>

        ))}

      </div>
      
{
showCart && (

<div className="cart-box">


<h2>
Your Cart
</h2>


{
cart.length===0 ?

<p>
Cart is empty
</p>


:

cart.map((item)=>(


<div className="cart-item" key={item.id}>


<img 
src={item.image}
alt={item.name}
/>


<div>

<h4>
{item.name}
</h4>


<p>
{item.price}
</p>


<button
onClick={()=>removeFromCart(item.id)}
>
Remove
</button>


</div>


</div>


))

}



<h3>
Total Items : {cart.length}
</h3>


<button
className="order-btn"
onClick={placeOrder}
disabled={cart.length===0}
>
Place Order
</button>


<button
className="close-cart"
onClick={()=>setShowCart(false)}
>
Close
</button>


{

orderMessage &&

<h3 className="success">
{orderMessage}
</h3>

}


</div>

)

}
 

      {/* Footer */}

      <footer>

        <h2>
          SHOES STORE
        </h2>

        <p>
          Premium Footwear Collection
        </p>

        <p>
          © 2026 All Rights Reserved
        </p>

      </footer>

    </div>

  );

}

export default Shoes;