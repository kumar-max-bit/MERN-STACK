import Productcard from './Productcard';
import './productStyling.css';

const Products = (props) => {
  let products = [{
    name:"mobile",
    price:50000,
    description:"good condition",
    rating:"⭐⭐⭐⭐",
    imgSrc:"https://rukminim2.flixcart.com/image/636/636/xif0q/mobile/e/7/c/f5-5g-mzb0e7lin-poco-original-imagpep3w5zmcdcd.jpeg?q=90"
  },
  {
    name:"laptop",
    price:70000,
    description:"high performance",
    rating:"⭐⭐⭐⭐⭐",
    imgSrc:"https://m.media-amazon.com/images/I/718-7YE0WQL._SX450_.jpg"
  },
  {
    name:"watch",
    price:5000,
    description:"water resistant",
    rating:"⭐⭐⭐",
    imgSrc:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRkVH3ASn5pr5bkviaXrD3ZKvrhDNAFgDmvvDbmccZk_Dl7kyG8o6MLa0CTSCyuq_Gh_enWC865VxojcxH3m3Wd7iROl40vN7R_e7SXw-5fcY116vVKvi9U"
    
  },
 
  
  {
    name:"iPhone 15",
    price:75000,
    description:"latest features",
    rating:"⭐⭐⭐⭐⭐",
    imgSrc:"https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
  },
  {
    name:"Samsung Galaxy S23",
    price:85000,
    description:"excellent camera",
    rating:"⭐⭐⭐⭐⭐",
    imgSrc:"https://m.media-amazon.com/images/I/71GwmqQS6XL._SL1500_.jpg"
  }
];

  // Repeat the same products twice
  products = [...products, ...products];

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <Productcard key={index} details={product} cartCount={props.cartCount} setCartCount={props.setCartCount} />
      ))}
    </div>
  );
};

export default Products;
