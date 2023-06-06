import { Link } from "gatsby"
import React from "react"

type ProductProps = {
  data: Data
}

const Products = ({ data }: ProductProps) => {
  return (
    <div className="product-list">
      {JSON.stringify(data.products.products)}
      {data.products.products.map((product, index) => {
        <p>{product}</p>
      });
    </div>
  )
}

export default Products
