import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "80px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Cart 🍫</h1>

      {cartItems.length === 0 ? (
        <p>No chocolates added yet.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                textAlign: "left"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <div>
                <h2>{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "30px",
              padding: "14px 40px",
              fontSize: "18px",
              cursor: "pointer",
              background: "#7a3e1c",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(122, 62, 28, 0.25)",
              transition: "all 0.2s"
            }}
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;