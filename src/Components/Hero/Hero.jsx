import React from "react";
import "./hero.css";

const Hero = ({ popularRef }) => {
  const scrollToPopular = () => {
    if (popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="heromain">
      <div className="hero-leftt"></div>
      <div className="hero-right">
        <div className="hero-content">
          <h1 className="hero-heading">Everyday Essentials, At Your Door.</h1>
          <p className="hero-text">🎉 Get 50% Off on your first order!</p>
          <button className="hero-btn" onClick={scrollToPopular}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
