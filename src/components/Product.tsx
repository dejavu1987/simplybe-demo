import { Link } from "gatsby"
import React from "react"
import Dress2 from "../images/dress2.jpg"
import Dress2_2 from "../images/dress2-2.jpg"
import BagIcon from "../images/bag-white.svg"
import BreadcrumbArrow from "../images/breadcrumb-arrow.svg"
import ChevronRight from "../images/chevron-right.svg"
import Zoom from "../images/zoom.svg"
import Tabs from "./Tabs/Tabs"
import { Tab } from "../../.cache/fast-refresh-overlay/helpers/keys"


type ProductProps = {
  data: Data
}

const Product = ({ data }: ProductProps) => {
  let truncatedDescription = data.values.description[0].data.substring(0, 173);

  return (
    <div className="page-wrapper">
      <section className="product-top-section">
        <div className="product-page max-width">
          <div className="breadcrumb">
            <img src={BreadcrumbArrow} /><a className="breadcrumb-item info">Dresses</a>
          </div>
          <div className="product-section">
            <div className="product-gallery">
              <div className="gallery-1-wrapper">
                <img className="gallery-1" src={Dress2} alt={data.values.Product_name[0].data} />
              </div>
              <div className="gallery-mask">
                <img className="gallery-2" src={Dress2_2} alt={data.values.Product_name[0].data} />
                <button className="next-button">
                  <img src={ChevronRight} alt="Next image" />
                </button>
                <button className="zoom-button">
                  <img src={Zoom} alt="Zoom image" />
                </button>
              </div>
            </div>
            <div className="product-info">
              <div className="product-price">£{data.values.price[0].data[0].amount}</div>
              <p className="short-description">{data.values.Product_name[0].data}</p>
              <div className="colour-size">
                <div className="colour">
                  <h5 className="colour-title">Colour</h5>
                  <p className="colour-name">PAISLEY PRINT</p>
                </div>
                <div className="size-select">
                  <button className="size" >
                    <span className="button-label">
                      Select Size
                    </span>
                  </button>
                </div>
              </div>
              <button className="add-to-bag">
                <span className="button-label">Add to Bag
                  <img src={BagIcon} alt="Add to bag" />
                </span>
              </button>
            </div>
          </div>
          <div className="product-description-truncated">
            <p>{truncatedDescription}...</p>
            <a className="info" href="#">Read More</a>
          </div>
        </div>
      </section>
      <div className="product-tabs">
        <Tabs />
      </div>
    </div>
  )
}

export default Product
