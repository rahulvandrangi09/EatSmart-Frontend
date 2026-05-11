import React, { useRef } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Newcollections from "../Components/NewCollections/Newcollections";
import Offer from '../Components/Offers/Offer'
const DailyEssentials = () => {
  const popularRef = useRef(null); // Create a ref for Popular section

  return (
    <div>
      <Hero popularRef={popularRef} /> {/* Pass ref to Hero */}
      <div ref={popularRef}>
        <Popular />
      </div>
      <Offer />
      <Newcollections />
    </div>
  );
};

export default DailyEssentials;
