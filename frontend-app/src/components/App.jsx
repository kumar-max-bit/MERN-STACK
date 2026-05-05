import React, { useState } from 'react';
import Nav from './Nav';
import Counter from './counter';
import CounterFBC from './CounterFBC';
import DisplyMyDetails from './DisplayMyDetails';
import Products from './Products';

const App = () => {
   let details=["ravi","507"];
   let Role="Developer";
   let mydetails=["Praveen kumar","507","CSE","BABA"];

   const [cartCount, setCartCount] = useState(0);

  return (
    <div>
     <Nav cartCount={cartCount} />
     <Counter/>
      <CounterFBC fulldetails={details} role={Role}/> 
      <DisplyMyDetails fulldetails={mydetails}/>
      <Products cartCount={cartCount} setCartCount={setCartCount} />
    </div>
    
  ); 
};

export default App;
