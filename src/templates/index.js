import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import { HTMLContent, MDContent } from '../components/Content';
import Map from '../components/Map';
import Gallery from '../components/Gallery';
import logo from '../img/logo/RUHlogo_title_red.png';
// import BigCalendar from 'react-big-calendar';
// import moment from 'moment';
// const localizer = BigCalendar.momentLocalizer(moment);

const StyledMDContent = styled(MDContent)`
  a {
    text-decoration: underline;
  }
`;

export const IndexPageTemplate = ({
  frontmatter,
  content,
  contentComponent,
}) => {
  // const PageContent = contentComponent || Content;
  const { hero, about, loc, sponsors, featured_images, events } = frontmatter;
  const sponsorList = Object.values(sponsors.sponsor_list);
  return (
    <Layout>
      <section className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container is-fluid">
            <div className="level">
              <div className="level-item">
                <div className="level-item">
                  <img src={logo} alt={hero.title} style={{ width: '4rem' }} />
                  <h1 className="title is-size-1">{hero.title}</h1>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <h2 className="subtitle is-size-4 has-text-centered">
                  <StyledMDContent content={hero.description} />
                </h2>
                <div className="level">
                  <div className="level-item">
                    <a
                      href="https://www.rusu.co.uk/societies/ruhacking/"
                      target="_blank"
                      className="button is-primary is-inverted is-outlined is-large is-rounded"
                    >
                      Join the society today!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero section--gallery is-primary is-large">
        <div className="hero-head">
          <div className="columns">
            <div className="column is-12">
              <Gallery images={featured_images.image_list} />
            </div>
          </div>
        </div>
      </section>

      <section className="hero section--about is-dark is-small">
        <div className="hero-body">
          <div className="container section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {about.title}
            </h2>
            <div className="columns">
              <div className="column is-half">
                <h3 className="title is-size-5 has-text-weight-bold is-bold-light">
                  {about.col_1.title}
                </h3>
                <StyledMDContent content={about.col_1.description} />
              </div>
              <div className="column is-half">
                <h3 className="title is-size-5 has-text-weight-bold is-bold-light">
                  {about.col_2.title}
                </h3>
                <StyledMDContent content={about.col_2.description} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero section--events is-primary is-large">
        <div className="hero-head">
          <div className="container section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              Upcoming Events
            </h2>
            <StyledMDContent content={sponsors.description} />
          </div>
        </div>
        <div className="hero-body is-paddingless">
          <div className="container section">
            <div className="columns is-centered">
              {events.map((v, i) => {
                return (
                  <div className="column">
                    <div
                      className="card is-centered"
                      key={i}
                      style={{ maxWidth: '350px', minHeight: '675px' }}
                    >
                      <a href={v.link} target="_blank">
                        <div className="card-image">
                          <figure className="image">
                            <img className="" src={v.image} alt={v.title} />
                          </figure>
                        </div>
                      </a>
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left" />
                          <div className="media-content">
                            <a href={v.link} target="_blank">
                              <p className="title has-text-black is-4">
                                {v.title}
                              </p>
                            </a>
                            <p className="subtitle has-text-black is-6">
                              {v.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="content">
                          <StyledMDContent content={v.desc} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="hero section--location is-dark is-small">
        <div className="hero-head">
          <div className="columns is-gapless">
            <div className="column is-fullheight is-two-thirds-desktop">
              <Map
                centre={{
                  lat: loc.coords.lat,
                  lng: loc.coords.lng,
                }}
                markerElement={
                  <div>
                    <h3 className="has-text-black">{loc.marker}</h3>
                  </div>
                }
              />
            </div>
            <div className="column is-one-third-desktop">
              <div className="section">
                <div
                  style={{ height: '100%' }}
                  className="container has-background-dark"
                >
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {loc.title}
                  </h2>
                  <p>{loc.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero section--sponsors is-primary is-large">
        <div className="hero-head">
          <div className="container section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {sponsors.title}
            </h2>
            <StyledMDContent content={sponsors.description} />
          </div>
        </div>
        <div className="hero-body is-paddingless">
          <div className="container section">
            <div className="columns is-centered">
              <div className="column is-10">
                <div className="tile is-ancestor">
                  {sponsorList
                    .reduce(
                      (acc, _, i) =>
                        i % 3 ? acc : [...acc, sponsorList.slice(i, i + 3)],
                      []
                    )
                    .map(val => {
                      return (
                        <div
                          key={val}
                          className="tile is-3 is-vertical is-parent"
                        >
                          {val.map(sec => {
                            return (
                              <div key={sec} className="tile is-child box">
                                <figure className="image">
                                  <img className="" src={sec} alt={sec} />
                                </figure>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

IndexPageTemplate.propTypes = {
  frontmatter: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const Index = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <IndexPageTemplate
      contentComponent={HTMLContent}
      frontmatter={post.frontmatter}
      content={post.html}
    />
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        hero {
          title
          description
        }
        loc {
          title
          description
          marker
          coords {
            lat
            lng
          }
        }
        events {
          title
          desc
          image
          link
          subtitle
        }
        featured_images {
          image_list
        }
        sponsors {
          title
          description
          sponsor_list
        }
        about {
          title
          col_1 {
            title
            description
          }
          col_2 {
            title
            description
          }
        }
      }
    }
  }
`;
