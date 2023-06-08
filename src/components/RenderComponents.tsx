import React from "react"

import HeroBanner from "./HeroBanner"
import BlogBanner from "./BlogBanner"
import Section from "./Section"
import BlogSection from "./BlogSection"
import CardSection from "./CardSection"
import TeamSection from "./TeamSection"
import SectionBucket from "./SectionBucket"
import AboutSectionBucket from "./AboutSectionBucket"
import SectionWithEmbedObject from "./SectionWithEmbedObject"
import { Component } from "../typescript/component"
import { Link } from "gatsby"
import CardsSlider from "./CardsSlider"
import Products from "./Products"
import Product from "./Product"

const RenderComponents = ({
  components,
  entryUid,
  contentTypeUid,
  blogPage,
  locale,
}: {
  components: Component[]
  entryUid: string
  contentTypeUid: string
  blogPage?: boolean
  locale: string
}) => {
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {components?.map((component, index) => {
        if (component["hero_banner"]) {
          return !blogPage ? (
            <HeroBanner data={component} key={"render" + index} />
          ) : (
            <BlogBanner data={component} key={"render" + index} />
          )
        }
        if (component["section"]) {
          return <Section data={component} key={"render" + index} />
        }
        if (component["section_with_buckets"]) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket data={component} key={"render" + index} />
          ) : (
            <SectionBucket data={component} key={"render" + index} />
          )
        }
        if (component["from_blog"]) {
          return <BlogSection data={component} key={"render" + index} />
        }
        if (component["cards_slider"]) {
          return <CardsSlider data={component} key={"render" + index} />
        }
        if (component["section_with_cards"]) {
          return <CardSection data={component} key={"render" + index} />
        }
        if (component["section_with_html_code"]) {
          return (
            <SectionWithEmbedObject data={component} key={"render" + index} />
          )
        }
        if (component["products"]) {
          return (
            <Products data={component} key={"render" + index} />
          )
        }
        if (component["our_team"]) {
          return <TeamSection data={component} key={"render" + index} />
        }
        if (component["enquiry_block"]) {
          return (
            <div
              className="centered-block"
              style={{
                background: `linear-gradient(45deg, ${component["enquiry_block"].background?.gradient_start} 0%, ${component["enquiry_block"].background?.gradient_end} 100%)`,
              }}
            >
              <h2>{component["enquiry_block"].title}</h2>
              <p>{component["enquiry_block"].body}</p>
              <Link
                to={component["enquiry_block"].cta?.url}
                className="btn outline-btn"
              >
                {component["enquiry_block"].cta?.label}
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}
export default RenderComponents
