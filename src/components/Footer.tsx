import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import parser from "html-react-parser"
import { onEntryChange } from "../live-preview-sdk"
import { getFooterRes, jsonToHtmlParse } from "../helper"
import { Social, Menu, Download, PayBy } from "../typescript/layout"

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
        my_account {
          link {
            href
            title
          }
        }
        help {
          link {
            href
            title
          }
        }
        about_us {
          link {
            href
            title
          }
        }
        delivery {
          link {
            href
            title
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
        download_app {
          link {
            href
          }
          icon {
            url
          }
        }
        pay_by {
          link {
            href
          }
          icon {
            url
          }
        }
        policies {
          link {
            href
            title
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
        <div className="footer-navigation-wrapper max-width">
          <nav>
            <h4>My Account</h4>
            <ul className="nav-ul">
              {getFooter.my_account.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav>
            <h4>Help</h4>
            <ul className="nav-ul">
              {getFooter.help.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav>
            <h4>About Us</h4>
            <ul className="nav-ul">
              {getFooter.about_us.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav>
            <h4>Delivery and Returns</h4>
            <ul className="nav-ul">
              {getFooter.delivery.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="feedback">
            <h4>Leave us your feedback</h4>
            <p>Help us improve your experience</p>
            <button>Leave Feedback</button>
          </div>
        </div>
      </div>
      <div className="footer-social max-width">
        <div className="footer-apps">
          <h4>Download our app</h4>
          {getFooter.download_app.map((download: Download, index: number) => {
            return (
              <a href={download.link?.href} key={index}>
                <img src={download.icon?.url} alt="Download App" />
              </a>
            )
          })}
        </div>
        <div className="social-nav">
          <h4>Simply Be Social</h4>
          <div className="social-nav-icons">
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
        <div className="pay-by">
          <h4>Pay By</h4>
          <div className="pay-by-icons">
            {getFooter.pay_by.map((payBy: PayBy, index: number) => {
              return (
                <a href={payBy.link?.href} key={index}>
                  <img src={payBy.icon?.url} alt="Pay By" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="footer-policies max-width">
        <div className="policy-nav">
          <nav>
            {typeof getFooter.copyright === "string" ? (
              <span className="copyright">{parser(getFooter?.copyright)}</span>
            ) : (
              ""
            )}
            <ul className="nav-ul">
              {getFooter.policies.link.map((menu: Menu, index: number) => {
                return (
                  <li className="footer-nav-li" key={index} {...menu.$?.title}>
                    <Link to={menu.href}>{menu.title}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
