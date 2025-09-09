import React from 'react'
import './footer.css'
import logo from '../Assests/shopping.png'
import insta from '../Assests/instagram_icon.png'
import pinterest from '../Assests/pintester_icon.png'
import whatsapp from '../Assests/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerlogo">
            <img src={logo} alt="" />
            <p>Eatsmart</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={insta} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pinterest} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>All Rights Reserved @2025</p>
        </div>
    </div>
  )
}

export default Footer