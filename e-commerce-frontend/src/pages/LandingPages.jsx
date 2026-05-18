import React from "react";
import CarouselContainer from "../Components/CarouselContainer";
import DumiProducts from "../Components/DumiProducts";
import FooterComponent from "../Components/FooterComponent";
import AIChatbot from "../Components/AIChatbot";

const LandingPage = () => {
  const handleGreeting = () => {
    const greeting = new SpeechSynthesisUtterance(
      "Welcome to Alpha Mart, your one-stop shop for everything you need!"
    );
    const voice = window.speechSynthesis;
    voice.rate = 0.9; // Adjusted for a more natural speech rate
    voice.speak(greeting);
  };

  return (
    <div>
      <button id="greeting-btn" onClick={handleGreeting}> Click for Greeting</button>
      <CarouselContainer />
      <h1>Products</h1>
      <DumiProducts />
      <FooterComponent />
      <AIChatbot />
    </div>
  );
};

export default LandingPage;