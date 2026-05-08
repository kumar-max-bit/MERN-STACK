import { useMemo, useState } from "react";

const Factorial = () => {
  const [num, setNumber] = useState(1);
  const [count, setCount] = useState(1);

  // useMemo purely computes the factorial when 'num' changes
  const result = useMemo(() => {
    let fact = 1;
    for (let i = 1; i <= num; i++) {
      fact *= i;
    }
    return fact;
  }, [num]);

  return (
    <div className="h-60 m-5">
      <h1 className="text-center text-3xl font-bold">Factorial </h1>
      <input
        type="number"
        value={num}
        onChange={(e) => {
          setNumber(Number(e.target.value));
        }}
        placeholder="Enter value to find Factorial"
        className="border-2 border-gray-400 p-2 rounded-xl my-4"
      />{" "}
      <div className="text-xl mb-4">Factorial: <span className="font-semibold text-blue-600">{result}</span></div>
      <button
        className="bg-red-500 text-white font-bold p-4 rounded-3xl mx-2 hover:bg-red-600 transition-colors cursor-pointer"
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
      >
        Increment Count {count}
      </button>
      <button
        className="bg-green-500 text-white font-bold p-5 rounded-3xl mx-3 hover:bg-green-600 transition-colors cursor-pointer"
        onClick={() => {
          setNumber((prevNum) => prevNum + 1);
        }}
      >
        Increment number: {num} : {result}
      </button>
    </div>
  );
};

export default Factorial;