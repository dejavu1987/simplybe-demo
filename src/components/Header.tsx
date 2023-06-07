import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { getHeaderRes, jsonToHtmlParse } from "../helper"
import { onEntryChange } from "../live-preview-sdk"
import closeIcon from "../images/close.svg"
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
          icon {
            uid
            url
            filename
          }
        }
        secondary_menu {
          label
          url
          icon {
            uid
            url
            filename
          }
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
  const [isOpen, setOpen] = useState(false)

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

  const toggleOpenNav = () => {
    setOpen(!isOpen)
  }

  return (
    <header className="header max-width">
      <nav className="header__secondary-nav">
        <div className="header__menu-nav">
          {getHeader?.secondary_menu?.slice(0, 2).map((menu: any) => (
            <div>
              {menu?.label === "Menu" ? (
                <button onClick={toggleOpenNav}>
                  <span className="button-label">
                    <img src={menu.icon.url} />
                    {menu.label}
                  </span>
                </button>
              ) : (
                <button>
                  <span className="button-label">
                    <img src={menu.icon.url} />
                    {menu.label}
                  </span>
                </button>
              )}
              ;
            </div>
          ))}
        </div>
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
        <ul className="header__user-nav">
          {getHeader?.secondary_menu?.slice(-2).map((menu: any) => (
            <li>
              <span className="button-label">
                <a href={menu.url}>
                  {menu.label}
                  <img src={menu.icon.url} />
                </a>
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={isOpen ? "main-nav-background open" : "main-nav-background"}
        onClick={toggleOpenNav}
      ></div>
      <div className={isOpen ? "main-nav open" : "main-nav"}>
        <button className="close-button" onClick={toggleOpenNav}>
          <img src={closeIcon} alt="Close navigation" />
        </button>
        <nav className="menu">
          <ul className="nav-ul header-ul">
            {getHeader?.navigation_menu?.map((menu, index: number) => {
              if (!menu) return ""
              return (
                <li className={"nav-li " + menu.label} key={menu.label}>
                  {menu?.label === "Sign In" ? (
                    <Link
                      to={`${menu.page_reference[0]?.url}`}
                      activeClassName="active"
                      className="signin"
                    >
                      {menu.label}
                      <img src={menu.icon.url} />
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

        {/*<div className="json-preview">*/}
        {/*  <Tooltip*/}
        {/*    content="JSON Preview"*/}
        {/*    direction="top"*/}
        {/*    dynamic={false}*/}
        {/*    delay={200}*/}
        {/*    status={0}*/}
        {/*  >*/}
        {/*    <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">*/}
        {/*      <img src={jsonIcon} alt="JSON Preview icon" />*/}
        {/*    </span>*/}
        {/*  </Tooltip>*/}
        {/*</div>*/}
      </div>
    </header>
  )
}

export default Header
