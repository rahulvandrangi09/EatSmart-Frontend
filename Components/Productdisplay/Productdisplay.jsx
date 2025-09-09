import React, { useContext } from 'react'
import './productdisplay.css'
import star from '../Assests/star_icon.png'
import star_dull from '../Assests/star_dull_icon.png'
import { Dailycontext } from '../../Context/Dailycontext'
const Productdisplay = (props) => {
    const {product} = props
    const {addToCart} = useContext(Dailycontext)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplayimg">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplayimage2">
                <img src={product.image} className='productdisplay-main' alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star_dull} alt="" />
            </div>
            <div className='productprice'>
                <div className="productpriceold">₹{product.old_price}</div>
                <div className="productpricenew">₹{product.new_price}</div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Add to cart</button>
        </div>
    </div>
  )
}

export default Productdisplay