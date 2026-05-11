import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Dailycontext } from '../Context/Dailycontext'
import Breadcrum from '../Components/BreadCrum/Breadcrum'
import Productdisplay from '../Components/Productdisplay/Productdisplay'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Productpage = () => {
  const { all_products } = useContext(Dailycontext)
  const { productId } = useParams()

  // ✅ Corrected Line: Compare string IDs
  const product = all_products.find((e) => String(e.id) === String(productId))

  if (!product) {
    return <h2 style={{ textAlign: "center", margin: "50px 0" }}>❌ Product not found</h2>
  }

  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <RelatedProducts />
    </div>
  )
}

export default Productpage