import { Link } from "gatsby"
import React from "react"

type ProductProps = {
  data: Data
}

const Products = ({ data }: ProductProps) => {
  return (
    <div className="product-list">
      {data.products.products.data.map((product, index) => {
        return (
          <div className="product">
            <p>Name {JSON.stringify(product.values.Product_name[0].data)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Products
