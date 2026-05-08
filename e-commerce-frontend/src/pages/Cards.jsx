import { useContext } from "react";
import { CartContext } from "../App";

const CartPage = () => {
  const { items, removeFromCart } = useContext(CartContext);

  return (
    <div className="container">
      <h2 className="text-center m-4">Cart</h2>
      {items.length <= 0 ? (
        <div className="text-center m-5 p-5">Products Not Added</div>
      ) : (
        <div className="row">
          {items.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.imageSrc}
                  className="card-img-top"
                  alt={product.title}
                  height="290px"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <button 
                    className="btn btn-danger mt-2"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;