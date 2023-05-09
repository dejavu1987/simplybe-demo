import { Link } from "gatsby"
import React from "react"
import { SectionProps } from "../typescript/component"
import classNames from "classnames"

type Data = {
  section: SectionProps
}

type DataSection = {
  section: SectionProps
}

type DataImg = {
  section: SectionProps
}

type BucketProps = {
  data: Data
}

const Section = ({ data }: BucketProps) => {
  const { background } = data.section

  function contentSection(dataSection: DataSection, index: string) {
    return (
      <div className="section-content" key={index}>
        {dataSection.section.title_h2 && (
          <h2 {...dataSection.section.$?.title_h2}>
            {dataSection.section.title_h2}
          </h2>
        )}
        {dataSection.section.description && (
          <p {...dataSection.section.$?.description}>
            {dataSection.section.description}
          </p>
        )}
        {dataSection.section.call_to_action.title &&
        dataSection.section.call_to_action.href ? (
          <a
            {...dataSection.section.call_to_action.$?.href}
            href={dataSection.section.call_to_action.href}
            className={classNames(
              "btn",
              background ? "outline-btn" : "primary-btn"
            )}
          >
            {dataSection.section.call_to_action.title}
          </a>
        ) : (
          ""
        )}
      </div>
    )
  }

  function imageContent(dataImg: DataImg, index: string) {
    return (
      <div>
        <img
          {...dataImg.section.image.$?.url}
          src={dataImg.section.image.url}
          alt="section-image"
          key={index}
        />
      </div>
    )
  }
  return (
    <div
      className={classNames(
        "section-block",
        background ? "has-background" : ""
      )}
      style={
        background
          ? {
              background: `linear-gradient(45deg, ${background.gradient_start} 0%, ${background.gradient_end} 100%)`,
            }
          : {}
      }
    >
      <div className="wrapper">
        {data.section.image_alignment === "Left"
          ? [imageContent(data, "left-1"), contentSection(data, "left-2")]
          : [contentSection(data, "right-1"), imageContent(data, "right-2")]}
      </div>
    </div>
  )
}

export default Section
