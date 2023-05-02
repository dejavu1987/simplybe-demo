/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 */

import React from "react"
import Header from "./Header"
import Footer from "./Footer"

typeof window !== "undefined" && require("bootstrap/dist/css/bootstrap.min.css")
typeof window !== "undefined" && require("bootstrap/dist/js/bootstrap")
require("../styles/style.css")
require("@contentstack/live-preview-utils/dist/main.css")

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
