import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import './CSS/productpage.css'
import { Dailycontext } from '../Components/Context/Dailycontext'
import Breadcrum from '../Components/BreadCrum/Breadcrum'
import Productdisplay from '../Components/Productdisplay/Productdisplay'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Productpage = () => {
  const { all_products, loading } = useContext(Dailycontext)
  const { productId } = useParams()

  if (loading) {
    return <h2 style={{ textAlign: "center", margin: "50px 0" }}>⏳ Loading product...</h2>
  }

  const product = all_products.find((e) => String(e.id) === String(productId))

  if (!product) {
    return <h2 style={{ textAlign: "center", margin: "50px 0" }}>❌ Product not found</h2>
  }

  return (
    <div className="productpage">
      <div className="productpage-breadcrum">
        <Breadcrum product={product} />
      </div>
      <div className="productpage-display">
        <div className="productpage-container">
          <Productdisplay product={product} />
        </div>
      </div>
      <div className="productpage-related">
        <div className="productpage-container">
          <RelatedProducts />
        </div>
      </div>
    </div>
  )
}

export default Productpage