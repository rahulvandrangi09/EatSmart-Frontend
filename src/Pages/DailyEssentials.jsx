import React, { useRef } from "react";
import "./CSS/dailyessentials.css";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Newcollections from "../Components/NewCollections/Newcollections";
import Offer from '../Components/Offers/Offer'
const DailyEssentials = () => {
  const popularRef = useRef(null); // Create a ref for Popular section

  return (
    <div className="daily-essentials">
      <div className="daily-essentials-hero">
        <Hero popularRef={popularRef} /> {/* Pass ref to Hero */}
      </div>
      <div className="daily-essentials-popular" ref={popularRef}>
        <Popular />
      </div>
      <div className="daily-essentials-offer">
        <Offer />
      </div>
      <div className="daily-essentials-new-collections">
        <Newcollections />
      </div>
    </div>
  );
};

export default DailyEssentials;
