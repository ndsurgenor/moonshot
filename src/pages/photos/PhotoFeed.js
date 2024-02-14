import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import { Container, Row, Col, Form } from 'react-bootstrap';


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
      <Col>
        {dataLoaded ? (
          <>
            {photos.results.length ? (
              console.log('photos')
            ) : (
              console.log('no results')
            )}
          </>
        ) : (
          console.log('spinner')
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block">
      </Col>
    </Row>
  );
}

export default PhotoFeed;