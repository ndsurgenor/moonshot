import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

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
      <Col md={7}>
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
              photos.results.map(photo => (
                <PhotoCard
                  key={photo.id}
                  {...photo}
                  setPhotos={setPhotos}
                />
              ))
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
      <Col md={5} className="d-none d-lg-block">
      </Col>
    </Row>
  );
}

export default PhotoFeed;