import { useContext, useState } from "react";
import { CartContext } from "../service/CartProvider";

const CartPage = () => {
  const { items, removeFromCart } = useContext(CartContext);
  const [inputText, setInputText] = useState("");

  const handleFilter = (e) => {
    setInputText(e.target.value);
  };

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(inputText.toLowerCase().trim())
  );

  return (
    <>
      <div id="filter-div">
        <input
          type="text"
          value={inputText}
          onChange={handleFilter}
          placeholder="Search Products"
        />
      </div>

      <div id="cart-products">
        {filteredProducts.length <= 0 ? (
          <div className="text-center m-5 p-5">Products Not Added</div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageSrc} alt={product.title} />
              <h1>Title:{product.title}</h1>
              <button
                onClick={() => {
                  removeFromCart(product);
                }}
              >
                Remove from cart
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CartPage;