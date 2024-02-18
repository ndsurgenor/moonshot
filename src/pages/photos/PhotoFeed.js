import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { getMoreData } from '../../utils/Utils';

import PhotoCard from '../../components/PhotoCard';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png';

import { Container, Col, Row, Form } from 'react-bootstrap';
import styles from '../../styles/PhotoFeed.module.css'

import { FiSearch } from "react-icons/fi";
import Filters from '../../components/Filters';


function PhotoFeed(props) {
  const {
    filter = "",
    header,
    message,    
  } = props
  const [photos, setPhotos] = useState({ results: [] });
  const [dataLoaded, setDataLoaded] = useState(false);
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
        console.log(err)
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
      <Row>
        <Col className="d-flex">
          <h1>{header}</h1>
          {currentUser &&
            <Filters />
          }
          <Form onSubmit={(e) => e.preventDefault()}>

            <Form.Control
              type="text"
              placeholder="Search photos by title, owner, feature, etc."
              className="mb-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}>

            </Form.Control>
            <FiSearch />
          </Form>
        </Col>
      </Row>
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
                  className={styles.PhotoGallery}
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