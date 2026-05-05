import { useState } from "react";



const CounterFBC=(props) => {

  

    let [count,setCount]=useState(0);

    
    
    
  return (
    <>
      <h3>Function Based Component</h3>
      <h4>Props Data: {props.fulldetails?.join(", ")}</h4>
      <h4>Role: {props.role}</h4>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment++</button>
      <button onClick={() => setCount(count - 1)}>Decrement--</button>
      <button onClick={() => setCount(0)}>Reset</button>
      
    </>
  );
};

export default CounterFBC;
