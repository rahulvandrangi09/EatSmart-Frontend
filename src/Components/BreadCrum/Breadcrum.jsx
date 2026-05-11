import React from 'react'
import './breadcrum.css'
import arrow from '../Assests/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {product} = props
    return (
    <div className='breadcrum'>
        Home <img src={arrow} alt="" /> Shop <img src={arrow} alt="" /> {
            product.category
        } {product.name}
    </div>
  )
}

export default Breadcrum