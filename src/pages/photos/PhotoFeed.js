import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
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
    <Row>
      <Col>
        <FiSearch />
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placholder="Search photos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}>
          </Form.Control>
        </Form>

        {dataLoaded ? (
          <>
            {photos.results.length ? (
              <InfiniteScroll
                children={
                  photos.results.map(photo => (
                    <Col sm={12} md={6} lg={4} className="d-inline-flex gap-3">
                    <PhotoCard key={photo.id} {...photo} setPhotos={setPhotos}/>
                    </Col>
                  ))
                }
                dataLength={photos.results.length}
                loader={<Asset spinner />}
                hasMore={!!photos.next}
                next={() => getMoreData(photos, setPhotos)}
              />
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
      </Col>
    </Row>
  );
}

export default PhotoFeed;