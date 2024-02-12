import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import Photo from './Photo';

import { Row, Col, Container } from 'react-bootstrap';


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
        console.log(photo)
      } catch (err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  return (
    <Row className="d-flex justify-content-center">
      <Col md={11} lg={10} xl={9} xxl={8}>
        <Photo {...photo.results[0]} setPhotos={setPhoto} />
        <Container>
          Comments
        </Container>
      </Col>
    </Row>
  );
}

export default PhotoPage;