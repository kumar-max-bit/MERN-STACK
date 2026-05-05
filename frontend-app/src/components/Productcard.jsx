import { useState } from 'react';
import './productStyling.css';

const Productcard = (props) => {
  const [itemCount, setItemCount] = useState(0);

  const handleAddToCart = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    if (props.setCartCount) {
      const totalCount = props.cartCount + 1;
      props.setCartCount(totalCount);
      console.log("", totalCount);
    }
  };

  return (
    <div className="product-card">
      <img 
        src={props.details.imgSrc} 
        alt={props.details.name} 
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-title">{props.details.name}</h2>
        <p>{props.details.description}</p>
        <h3 className="product-price">Price: ₹{props.details.price}</h3>
        <span style={{ display: "block", marginBottom: "15px" }}>Rating: {props.details.rating}</span>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart {itemCount > 0 ? `(${itemCount})` : ""}
        </button>
      </div>
    </div>
  );
};

export default Productcard;