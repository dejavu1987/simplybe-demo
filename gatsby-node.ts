const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve("src/templates/page.tsx")
  const productTemplate = path.resolve("src/templates/product.tsx")

  const pageQuery = await graphql(`
    query {
      allContentstackPage {
        nodes {
          title
          url
        }
      }
    }
  `)
  const productQuery = await graphql(`
    query {
      allContentstackProduct {
        nodes {
          title
          url
        }
      }
    }
  `)

  const createPageTemplate = (route, comp, url) => {
    createPage({
      path: `${route}`,
      component: comp,
      context: {
        url: url,
      },
    })
  }
  pageQuery.data.allContentstackPage.nodes.forEach(node => {
    if (node.url !== "/" && node.url !== "/blog") {
      createPageTemplate(node.url, pageTemplate, node.url)
    }
  })
  productQuery.data.allContentstackProduct.nodes.forEach(node => {
    createPageTemplate(node.url, productTemplate, node.url)
  })
}
