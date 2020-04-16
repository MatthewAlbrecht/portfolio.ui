import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import normalizer from 'src/normalizers/index'

class PageTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const page = get(this.props, 'data.contentfulPage')
    const components = get(this.props, 'data.contentfulPage.components')
    
    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${page.name} | ${siteTitle}`} />
      </div>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPage(slug: { eq: $slug }) {
      name
      slug
      components {
        ... on ContentfulComponentLandingHero {
          id
          heading
        }
        ... on ContentfulComponentProject {
          id
          name
        }
        ... on ContentfulCompnentWorkExperience {
          id
          name
          dateRange
        }
      }
    }
  }
`
