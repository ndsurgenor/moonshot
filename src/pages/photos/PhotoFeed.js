import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import PhotoCard from './PhotoCard';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png';

import { Container, Col, Row } from 'react-bootstrap';


function PhotoFeed({ message, filter = "" }) {
  const [photos, setPhotos] = useState({ results: [] });
  const [dataLoaded, setDataLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const { data } = await axiosReq.get(`/photos/?${filter}`)
        setPhotos(data)
        setDataLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }
    setDataLoaded(false)
    getPhotos()
  }, [filter, pathname])

  return (
    <Row className="h-100">
      <Col md={8}>
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
      <Col md={4} className="d-none d-lg-block">
      </Col>
    </Row>
  );
}

export default PhotoFeed;