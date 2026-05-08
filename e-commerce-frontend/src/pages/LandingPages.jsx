import React from "react";
import CarouselContainer from "../components/CarouselContainer";
import DumiProducts from "../components/DumiProducts";
import FooterComponent from "../components/FooterComponent";

const LandingPage = () => {
  const handleGreeting = () => {
    const greeting = new SpeechSynthesisUtterance(
      "Welcome to Alpha Mart, your one-stop shop for everything you need!"
    );
    const voice = window.speechSynthesis;
    voice.rate=0.1;
    voice.speak(greeting);
  };

  return (
    <div>
      <button id="greeting-btn" onClick={handleGreeting}> Click for Greeting</button>
      <CarouselContainer />
      <h1>Products</h1>
      <DumiProducts />
      <FooterComponent />
    </div>
  );
};

export default LandingPage;