import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { getMoreData } from '../../utils/Utils';
import PhotoCard from './PhotoCard';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png';

import { Container, Col, Row, Form } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";


function PhotoFeed({ message, filter = "" }) {
  const [photos, setPhotos] = useState({ results: [] });
  const [dataLoaded, setDataLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

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
        <Col>
          <h1>Latest Photos</h1>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FiSearch />
            <Form.Control
              type="text"
              placeholder="Search photos by title, owner, feature, etc."
              className="mb-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}>
            </Form.Control>
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
                <ResponsiveMasonry columnsCountBreakPoints={{0: 1, 767: 2, 1200: 3}}>
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
            <Asset spinner />
          </Container>
        )}
      </Row>
    </>
  );
}

export default PhotoFeed;