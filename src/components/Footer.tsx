import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import parser from "html-react-parser"
import { onEntryChange } from "../live-preview-sdk/index.d"
import { getFooterRes, jsonToHtmlParse } from "../helper/index.d"
import { Social, Menu } from "../typescript/layout"

import DevTools, { useDevTool } from "./DevTools"

const queryLayout = () => {
  const data = useStaticQuery(graphql`
    query {
      contentstackFooter {
        title
        uid
        logo {
          url
        }
        navigation {
          link {
            href
            title
          }
        }
        policies {
          link {
            title
            href
          }
        }
        social {
          social_share {
            link {
              href
              title
            }
            icon {
              url
            }
          }
        }
        copyright
      }
    }
  `)
  return data
}

const Footer = () => {
  const { contentstackFooter } = queryLayout()
  jsonToHtmlParse(contentstackFooter)
  const [getFooter, setFooter] = useState(contentstackFooter)
  const { devToolData, updateDevTool } = useDevTool()

  async function updateFooterData() {
    const footerRes = await getFooterRes()
    setFooter(footerRes)
    updateDevTool && updateDevTool({ ...devToolData, footer: footerRes })
  }

  useEffect(() => {
    updateDevTool && updateDevTool({ ...devToolData, footer: getFooter })
  }, [getFooter, updateDevTool])

  useEffect(() => {
    onEntryChange(() => updateFooterData())
  }, [onEntryChange])

  return (
    <footer>
      <DevTools response={devToolData} />
      <div className="max-width footer-div">
        <div className="col-quarter">
          <Link to="/" className="logo-tag">
            <img
              {...getFooter.logo.$?.url}
              src={getFooter.logo?.url}
              alt={getFooter.title}
              title={getFooter.title}
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {getFooter.navigation.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {getFooter.social.social_share.map(
              (social: Social, index: number) => {
                return (
                  <a
                    href={social.link?.href}
                    title={social.link.title.toLowerCase()}
                    key={index}
                    className="footer-social-links"
                  >
                    <img src={social.icon?.url} alt="social-icon" />
                  </a>
                )
              }
            )}
          </div>
        </div>
      </div>
      <div className="policies">
        <div className="max-width">
          {getFooter.policies.link.map((link, index: number) => {
            return (
              <a
                href={link?.href}
                title={link.title}
                key={index}
                className="policies-link"
              >
                {link.title}
              </a>
            )
          })}
        </div>
      </div>
      <div className="copyright">
        {typeof getFooter.copyright === "string" ? (
          <div className="max-width" {...getFooter.$?.copyright}>
            {parser(getFooter?.copyright)}
          </div>
        ) : (
          ""
        )}
      </div>
    </footer>
  )
}

export default Footer
