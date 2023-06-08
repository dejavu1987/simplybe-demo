import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import { useLocation } from "@reach/router"
import { onEntryChange } from "../live-preview-sdk"
import { getPageRes, jsonToHtmlParse } from "../helper"
import { useDevTool } from "../components/DevTools"
import Product from "../components/Product"
import RenderComponents from "../components/RenderComponents"

const ProductTemplate = ({ data: { contentstackProduct } }: any) => {
  const { pathname } = useLocation()
  jsonToHtmlParse(contentstackProduct)
  const [getEntry, setEntry] = useState(contentstackProduct)
  const { devToolData, updateDevTool } = useDevTool()

  async function fetchData() {
    try {
      const entryRes = await getPageRes(`/${pathname.split("/")[1]}`)
      if (!entryRes) throw new Error("Error 404")
      setEntry(entryRes)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onEntryChange(() => fetchData())
  }, [])

  useEffect(() => {
    updateDevTool && updateDevTool({ ...devToolData, page: getEntry })
  }, [updateDevTool, getEntry])

  return (
    <Layout>
      <SEO title={getEntry.title} />
      <Product data={getEntry.product.data[0]} />
    </Layout>
  )
}

export const productQuery = graphql`
  query ($url: String!) {
    contentstackProduct(url: { eq: $url }) {
      title
      url
      product
    }
  }
`

export default ProductTemplate
