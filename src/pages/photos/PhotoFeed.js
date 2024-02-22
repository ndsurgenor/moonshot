import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { getMoreData } from '../../utils/Utils';

import Avatar from '../../components/Avatar';
import Filters from '../../components/Filters';
import PhotoCard from '../../components/PhotoCard';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png';

import { Container, Col, Row, Form } from 'react-bootstrap';
import styles from '../../styles/PhotoFeed.module.css'
import appStyles from '../../App.module.css'

import { FiSearch } from 'react-icons/fi';
import { GoRocket } from 'react-icons/go';


function PhotoFeed(props) {
  const {
    filter = "",
    header,
    message,
  } = props
  const [photos, setPhotos] = useState({ results: [] });
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();


  useEffect(() => {
    const getPhotos = async () => {
      try {
        const { data } = await axiosReq.get(
          `/photos/?${filter}search=${query}`
        )
        setPhotos(data)
        setDataLoaded(true)
      } catch (err) {
        // console.log(err)
      }
    }
    setDataLoaded(false)
    const photoFeedDelay = setTimeout(() => {
      getPhotos()
    }, 1000)
    return () => {
      clearTimeout(photoFeedDelay)
    }
  }, [filter, pathname, query])


  return (
    <>
      {/* Page Headers*/}
      <Row>
        {id ? (
          // User Profile          
          <Container className="d-block d-md-flex text-center text-md-start my-3">
            <Col xs={12} md={6}>
              <h3>User Profile for {currentUser?.username}</h3>
              <Avatar src={currentUser?.profile_image} height={75} />
            </Col>
            <Col xs={12} md={6}>
              <h3>Main Gear</h3>
              <p className="mb-0">Telescope/Lens: { }</p>
              <p className="mb-0">Camera:</p>
              <p className="mb-0">Other Equipment:</p>
            </Col>
          </Container>
        ) : currentUser ? (
          // Signed In Home Page
          <Container
            className="d-md-flex text-center text-md-start mt-md-3 mb-3"
          >
            <Col xs={12} md={8}>
              <h1 className={styles.FeedHeader}>
                viewing {header}
              </h1>
            </Col>
            <Col xs={12} md={4} >
              <Filters className="me-md-2" />
            </Col>
          </Container>
        ) : (
          // Signed Out Home Page
          <Col xs={12}>
            <h1 className="text-center mt-md-3 mb-0">
              <span className={appStyles.Brand}>
                Welcome to moonshot
              </span>
            </h1>
            <h4 className="text-center mb-3">
              Your space to snap & share space
              <GoRocket className="ms-2" />
            </h4>
            <p className="text-center">
              Please<Link className={styles.FeedLink} to="/signup">sign up</Link>
              or<Link className={styles.FeedLink} to="/signin">sign in</Link>
              to get the most out of your visit
            </p>
          </Col>
        )}
      </Row>

      {/* Search Bar */}
      <Row>
        <Col>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex">
              <FiSearch className={styles.FeedSearchIcon} />
              <Form.Control
                type="text"
                placeholder="Search photos by title, owner, feature, etc."
                className="mb-3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}>

              </Form.Control>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Photo Gallery */}
      <Row>
        {dataLoaded ? (
          <>
            {photos.results.length ? (
              <InfiniteScroll
                dataLength={photos.results.length}
                loader={<Asset spinner />}
                hasMore={!!photos.next}
                next={() => getMoreData(photos, setPhotos)}
              >
                <ResponsiveMasonry
                  className={styles.FeedGallery}
                  columnsCountBreakPoints={{ 0: 1, 767: 2, 1200: 3 }}
                >
                  <Masonry>
                    {photos.results.map(photo => (
                      <PhotoCard
                        key={photo.id}
                        {...photo}
                        setPhotos={setPhotos}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </InfiniteScroll>
            ) : (
              <Container>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset message='Loading images...' spinner />
          </Container>
        )}
      </Row>

    </>
  );
}

export default PhotoFeed;