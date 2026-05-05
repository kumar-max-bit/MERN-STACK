import { useState } from "react";

const Counter = (props) => {
    let [count,setcount]=useState(0);
   
    return(
        <>
        <h3>function based components</h3>
        <h1>Count:{count}</h1>
        <button onClick={()=>{setcount(count+1)}}>Increment</button>
        <button onClick={()=>{setcount(count-1)}}>Decrement</button>
        <button onClick={()=>{setcount(0)}}>Reset</button>
        </>
    )
}
export default Counter;