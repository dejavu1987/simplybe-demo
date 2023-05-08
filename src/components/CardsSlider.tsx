import { Link } from "gatsby"
import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FeaturedBlogData } from "../typescript/component"
type Data = {
  cards_slider: FeaturedBlogData
}

type FeaturedBlogProps = {
  data: Data
}

const CardsSlider = ({ data: { cards_slider } }: FeaturedBlogProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  return (
    <div className="cards-slider-section">
      <div className="max-width">
        <h2>{cards_slider.title}</h2>
        <Slider {...settings} className="slides">
          {cards_slider.cards.map((blog, index) => {
            return (
              <div className="card" key={index}>
                {blog.type && <div className="featured-type">{blog.type}</div>}
                {blog.featured_image ? (
                  <img
                    {...blog.featured_image.$?.url}
                    src={blog.featured_image.url}
                    alt={blog.featured_image.title}
                    className="blog-post-img"
                  />
                ) : (
                  ""
                )}
                <div className="featured-content">
                  {blog.title ? <h3 {...blog.$?.title}>{blog.title}</h3> : ""}

                  <Link className="btn primary-btn" to={blog.url}>
                    {"Read More"}
                  </Link>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default CardsSlider
