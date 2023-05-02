import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Tooltip from "./ToolTip"
import jsonIcon from "../images/json.svg"
import { getHeaderRes, jsonToHtmlParse } from "../helper/index.d"
import { onEntryChange } from "../live-preview-sdk/index.d"
import DevTools, { useDevTool } from "./DevTools"

const queryHeader = () => {
  const query = graphql`
    query HeaderQuery {
      contentstackHeader {
        title
        uid
        logo {
          uid
          url
          filename
        }
        navigation_menu {
          label
          page_reference {
            title
            url
            uid
          }
        }
        secondary_menu {
          label
          url
        }
      }
    }
  `
  return useStaticQuery<Queries.HeaderQueryQuery>(query)
}

const Header = () => {
  const { contentstackHeader } = queryHeader()
  jsonToHtmlParse(contentstackHeader)
  const [getHeader, setHeader] = useState(contentstackHeader)
  const { devToolData, updateDevTool } = useDevTool()

  async function updateHeaderData() {
    const headerRes = await getHeaderRes()
    setHeader(headerRes)
  }

  useEffect(() => {
    updateDevTool && updateDevTool({ ...devToolData, header: getHeader })
  }, [getHeader, updateDevTool])

  useEffect(() => {
    onEntryChange(() => updateHeaderData())
  }, [onEntryChange])

  return (
    <header className="header">
      <div>
        <nav>
          <ul>
            {getHeader?.secondary_menu?.map((menu: any) => (
              <li>
                <a href={menu.url}>{menu.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          <Link to="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={getHeader?.logo?.url || "/images/logo.png"}
              alt={getHeader?.title}
              title={getHeader?.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <nav className="menu">
          <ul className="nav-ul header-ul">
            {getHeader?.navigation_menu?.map((menu, index: number) => {
              if (!menu) return ""
              return (
                <li className="nav-li" key={menu.label}>
                  {menu?.label === "Home" ? (
                    <Link
                      to={`${menu.page_reference[0]?.url}`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  ) : (
                    <Link
                      to={`${menu.page_reference[0]?.url}/`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="json-preview">
          <Tooltip
            content="JSON Preview"
            direction="top"
            dynamic={false}
            delay={200}
            status={0}
          >
            <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <img src={jsonIcon} alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

export default Header
