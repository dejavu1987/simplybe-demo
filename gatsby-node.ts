const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve("src/templates/blog-post.tsx")
  const pageTemplate = path.resolve("src/templates/page.tsx")
  const blogPostQuery = await graphql(`
    query {
      allContentstackBlogPost {
        nodes {
          title
          url
        }
      }
    }
  `)

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

  const createBlogPostTemplate = (route, comp, title) => {
    createPage({
      path: `${route}`,
      component: comp,
      context: {
        title: title,
      },
    })
  }

  const createPageTemplate = (route, comp, url) => {
    createPage({
      path: `${route}`,
      component: comp,
      context: {
        url: url,
      },
    })
  }
  blogPostQuery.data.allContentstackBlogPost.nodes.forEach(node => {
    createBlogPostTemplate(node.url, blogPostTemplate, node.title)
  })
  pageQuery.data.allContentstackPage.nodes.forEach(node => {
    if (node.url !== "/" && node.url !== "/blog") {
      createPageTemplate(node.url, pageTemplate, node.url)
    }
  })
}
