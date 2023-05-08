import { Link } from "gatsby"
import React from "react"
import parser from "html-react-parser"
import { FeaturedBlogData } from "../typescript/component"

type Data = {
  from_blog: FeaturedBlogData
}

type FeaturedBlogProps = {
  data: Data
}

const BlogSection = ({ data: { from_blog } }: FeaturedBlogProps) => {
  return (
    <div className="community-section">
      <div className="home-featured-blogs">
        {from_blog.featured_blogs.map((blog, index) => {
          return (
            <div className="featured-blog" key={index}>
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
      </div>
    </div>
  )
}

export default BlogSection
