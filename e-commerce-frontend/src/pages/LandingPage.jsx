import React from "react";
import { Container, Button } from "react-bootstrap";
import CarouselContainer from "../components/CarouselContainer";
import DumiProducts from "../components/DumiProducts";
import FooterComponent from "../components/FooterComponent";

const LandingPage = () => {
  const handleGreeting = () => {
    let txt = "Welcome to Alpha Mart India";
    let wSpeech = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(txt);
    voice.rate = 0.9; // Adjusted rate for realistic speech
    wSpeech.speak(voice);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Top Banner */}
      <div className="bg-dark text-warning text-center py-2 fs-6 fw-semibold shadow-sm">
        🎉 Free Shipping on all orders above ₹499 across India!
      </div>

      {/* Hero Slider */}
      <CarouselContainer />

      <Container className="py-5">
        {/* Welcome & Announcement Action */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 p-4 bg-white rounded shadow-sm border">
          <div>
            <h2 className="fw-bold mb-1">Discover Indian Tech & Apparel</h2>
            <p className="text-muted mb-0">Experience premium shopping with localized prices and lightning-fast logistics.</p>
          </div>
          <Button
            variant="warning"
            id="greeting-btn"
            onClick={handleGreeting}
            className="fw-bold d-flex align-items-center gap-2 mt-3 mt-md-0 px-4 py-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-volume-up-fill" viewBox="0 0 16 16">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14 8c0-2.29-.904-4.37-2.37-5.83a.5.5 0 0 0-.707.707A7.476 7.476 0 0 1 13 8c0 2.022-.812 3.85-2.119 5.17a.5.5 0 0 0 .655.757l.001-.001zm-2.5-2.58A5.474 5.474 0 0 0 11 8c0-1.49-.607-2.83-1.583-3.805a.5.5 0 0 0-.708.708A4.474 4.474 0 0 1 10 8c0 1.226-.497 2.336-1.288 3.129a.5.5 0 1 0 .723.693l-.001-.001zM7 4a.5.5 0 0 0-.712-.458L3.682 5.045H1.5A1.5 1.5 0 0 0 0 6.545v3a1.5 1.5 0 0 0 1.5 1.5h2.182l2.606 1.503A.5.5 0 0 0 7 12V4z"/>
            </svg>
            Listen to Welcome
          </Button>
        </div>

        {/* Products Title */}
        <h3 className="fw-bold mb-4 position-relative pb-2" style={{ display: "inline-block" }}>
          Trending Products
          <span
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "50%",
              height: "4px",
              backgroundColor: "#ffc107",
              borderRadius: "2px"
            }}
          ></span>
        </h3>

        {/* Real-time products from database */}
        <DumiProducts />
      </Container>

      {/* Modern Footer */}
      <FooterComponent />
    </div>
  );
};

export default LandingPage;
