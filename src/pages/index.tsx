import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RenderComponents from "../components/RenderComponents"
import { onEntryChange } from "../live-preview-sdk"
import { getPageRes, jsonToHtmlParse } from "../helper"
import { PageProps } from "../typescript/template"
import { useDevTool } from "../components/DevTools"

const Home = ({ data: { contentstackPage } }: PageProps) => {
  jsonToHtmlParse(contentstackPage)
  const [getEntry, setEntry] = useState(contentstackPage)
  const { devToolData, updateDevTool } = useDevTool()
  async function fetchData() {
    try {
      const entryRes = await getPageRes("/")
      if (!entryRes) throw new Error("Error 404")
      setEntry(entryRes)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    updateDevTool && updateDevTool({ ...devToolData, page: getEntry })
  }, [updateDevTool, getEntry])

  useEffect(() => {
    onEntryChange(() => fetchData())
  }, [])

  return (
    <Layout>
      <SEO title={getEntry.title} />
      {getEntry.page_components && (
        <RenderComponents
          components={getEntry.page_components}
          contentTypeUid="page"
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePage {
    contentstackPage(url: { eq: "/" }) {
      title
      url
      uid
      locale
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
      page_components {
        contact_details {
          address
          email
          phone
        }
        enquiry_block {
          title
          body
        }
        cards_slider {
          title
          cards {
            title
            type
            date(formatString: "ll")
            url
            featured_image {
              url
              title
            }
          }
        }
        from_blog {
          title_h2
          featured_blogs {
            title
            type
            uid
            url
            featured_image {
              url
              uid
            }
            body
            author {
              title
              uid
              bio
            }
          }
          view_articles {
            title
            href
          }
        }
        hero_banner {
          banner_description
          banner_title
          bg_color
          banner_image {
            url
            uid
          }
          call_to_action {
            title
            href
          }
        }
        our_team {
          title_h2
          description
          employees {
            name
            designation
            image {
              url
              uid
            }
          }
        }
        section {
          title_h2
          description
          image {
            url
            uid
          }
          image_alignment
          call_to_action {
            title
            href
          }
        }
        section_with_buckets {
          title_h2
          description
          buckets {
            title_h3
            description
            icon {
              url
              uid
            }
            call_to_action {
              title
              href
            }
          }
        }
        section_with_cards {
          cards {
            title_h3
            description
            call_to_action {
              title
              href
            }
          }
        }
        products {
          products
        }
      }
    }
  }
`

export default Home
