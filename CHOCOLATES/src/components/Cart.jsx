import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {

  const { cartItems } = useContext(CartContext);

  return (
    <div style={{ padding: "80px" }}>

      <h1>Your Cart 🍫</h1>

      {
        cartItems.length === 0 ? (
          <p>No chocolates added yet.</p>
        ) : (
          <>
            {
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    margin: "20px"
                  }}
                >

                  <img 
                    src={item.image} 
                    alt={item.name}
                    width="120"
                  />

                  <h2>{item.name}</h2>

                  <p>Price: ₹{item.price}</p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>
              ))
            }


            <button
              onClick={() => alert("🍫 Order Successfully Placed!")}
              style={{
                marginTop: "30px",
                padding: "12px 30px",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              Book Now
            </button>

          </>
        )
      }

    </div>
  );
};

export default Cart;