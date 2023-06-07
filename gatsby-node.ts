const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve("src/templates/page.tsx")

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
}
