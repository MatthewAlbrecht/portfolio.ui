const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageComponent = path.resolve('./src/templates/page.js')
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        
        const pages = result.data.allContentfulPage.edges
        pages.forEach((page, index) => {
          createPage({
            path: `${page.node.slug}`,
            component: pageComponent,
            context: {
              slug: page.node.slug
            },
          })
        })
      })
    )
  })
}
