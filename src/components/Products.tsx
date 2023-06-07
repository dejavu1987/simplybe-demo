import { Link } from "gatsby"
import React from "react"
import Dress from "../images/dress.jpg"

type ProductProps = {
  data: Data
}

const Products = ({ data }: ProductProps) => {
  return (
    <div className="product-list">
      <div className="product-list-inner max-width">
        {data.products.products.data.map((product, index) => {
          return (
            <div className="product">
              <img src={Dress} alt={product.values.Product_name[0].data} />
              <div className="product-details">
                <p className="product-price">
                  {product.values.price &&
                    product.values.price[0].data[0].amount}
                </p>
                <p className="product-name">
                  {product.values.Product_name[0].data}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
