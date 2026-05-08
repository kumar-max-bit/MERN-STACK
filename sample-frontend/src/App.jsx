import Factorial from "./Factorial";

const App = () => {
  return (
    <>
    <Factorial/>
    <div className="bg-[url('https://t4.ftcdn.net/jpg/03/04/86/61/360_F_304866110_63UOE2JR9mdXnB6IOlqjgNUrkkAPLvvI.jpg')] bg-no-repeat w-full bg-cover min-h-screen p-5 flex flex-col justify-center items-center">
      <h1 className="w-full max-w-2xl text-center font-bold bg-green-400 m-3 p-5 italic text-2xl rounded-4xl shadow-2xl shadow-red-400 line-through decoration-red-500 decoration-[5px] decoration-dotted">
        Sample Project
      </h1>
      <h2 className="backdrop-blur-2xl px-10 py-4 mb-6 min-w-fit text-center text-2xl font-bold shadow-2xl shadow-amber-500 rounded-3xl text-white">
        Welcome to Tailwind
      </h2>
      
      <div className="bg-purple-400 p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 rounded-2xl w-full max-w-5xl">
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-red-400 h-16 w-full rounded-2xl shadow-sm shadow-black hover:scale-105 transition-transform duration-300 cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
    
    </>
  );
};

export default App;