import React from 'react'
import './offer.css'
import HeroBanner2 from '../Assests/HeroBanner2.png'
const Offer = () => {
  return (
    <div className='offers'>
        <div className="offer-up">
            <h1>A Taste of Pure Luxury</h1>
            <h3>Indulge in premium dry fruits at irresistible prices. Enjoy up to 40% off today!</h3>
            <h3>Check Now</h3>
        </div>
        <div className="offer-down">
            <img src={HeroBanner2} alt="Hero" />
        </div>
    </div>
  )
}

export default Offer