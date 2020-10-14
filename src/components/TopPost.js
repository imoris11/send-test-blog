import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class TopPost extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const post = posts && posts.length > 0 ? posts[0].node : null

    return (
      post && (
        <div className="clearfix mb">
          <div className="top_post one_post clearfix">
            <div className="post_image right">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                }}
              />
            </div>

            <div className="post_attr column">
              <p className="mb category_date">
                <Link to={post.fields.slug} className="_bold uppercased">
                  Product Updates
                </Link>
              </p>

              <h2>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              </h2>
              {/* <p className="tagline mb">{post.excerpt}</p> */}

              <p className="category_">
                <span>{post.frontmatter.date}</span>{' '}
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                <span>Elijah Shokenu</span>
              </p>
            </div>
          </div>
        </div>
      )
    )
  }
}

TopPost.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TopPostQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { featuredpost: { eq: true } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 200, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <TopPost data={data} count={count} />}
  />
)
