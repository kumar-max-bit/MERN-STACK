import React from 'react';
import Nav from './Nav';

const App=()=>{ 
  const items = ['React', 'Node.js', 'Express', 'MongoDB'];

  return (
    <div>
      <Nav />
      <h1>welcome to react js </h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>hello</h2>
    </div>) 
}
export default App;