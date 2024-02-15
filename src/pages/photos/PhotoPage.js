import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import Photo from './PhotoCard';

import { Container, Row, Col } from 'react-bootstrap';


function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: photo }] = await Promise.all([
          axiosReq.get(`/photos/${id}`)
        ])
        setPhoto({ results: [photo] })
      } catch (err) {
        console.log(err)
      }
    }
    handleMount()
  }, [id])

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={11} sm={12} md={10} lg={9} xl={8} xxl={7}>
        <Photo
          {...photo.results[0]}
          setPhotos={setPhoto}
          photoPage
        />
        <Container>
          Comments
        </Container>
      </Col>
    </Row>
  );
}

export default PhotoPage;