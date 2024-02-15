import React from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar'

import {
  Container, Row, Col, Card, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import styles from '../../styles/PhotoCard.module.css'

import { CgComment } from "react-icons/cg";
import { FaRegStar, FaStar } from "react-icons/fa";



const Photo = (props) => {
  const {
    id,
    user,
    user_id,
    user_avatar,
    comment_count,
    star_count,
    star_id,
    title,
    main_feature,
    description,
    location,
    photo_date,
    photo_time,
    lens_used,
    camera_used,
    other_equipment_used,
    image,
    photoPage,
    setPhotos,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;

  const handleStarAdd = async () => {
    try {
      const { data } = await axiosRes.post('/stars/', { photo: id })
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id ? {
            ...photo,
            star_count: photo.star_count + 1,
            star_id: data.id
          } : photo;
        })
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleStarRemove = async () => {
    try {
      await axiosRes.delete(`/stars/${star_id}`)
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id ? {
            ...photo,
            star_count: photo.star_count - 1,
            star_id: null
          } : photo;
        })
      }))
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Card className="me-1 mt-1 bg-dark text-white">

      {/* Photo */}
      <Link to={`/photos/${id}`}>
        <Card.Img src={image} alt="Photo" />
        <Card.ImgOverlay>
          {/* Photo Owner */}
          <Link to={`/user-profiles/${user_id}`}>
            <Container className="d-flex g-0">
              <Card.Subtitle className={styles.PhotoOwner}>
                <span className="me-1">{user}</span>
                <Avatar src={user_avatar} height={30} />
                {is_owner && photoPage && '...'}
              </Card.Subtitle>
            </Container>
          </Link>
        </Card.ImgOverlay>
      </Link>

      {/* Stars & Comments */}
      <Container className={styles.PhotoInteractions}>
        {is_owner ? (
          <OverlayTrigger placement="top" overlay={
            <Tooltip>Stars can't be added to your own photos</Tooltip>
          }
          >
            <span>
              <FaStar className={styles.PhotoIcon} />
            </span>
          </OverlayTrigger>
        ) : star_id ? (
          <span onClick={handleStarRemove}>
            <FaStar className={styles.PhotoStarred} />
          </span>
        ) : currentUser ? (
          <span onClick={handleStarAdd}>
            <FaRegStar className={styles.PhotoIcon} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top" overlay={
              <Tooltip>Please sign in to add stars</Tooltip>
            }
          >
            <span>
              <FaRegStar className={styles.PhotoIcon} />
            </span>
          </OverlayTrigger>
        )}
        <p>{star_count}</p>
        <Link to={`/photos/${id}`}>
          <span><CgComment className={styles.PhotoIcon} /></span>
        </Link>
        <p>{comment_count}</p>
      </Container>

      {/* Photo Details (does not display in feeds) */}
      {photoPage &&
        <Container className={styles.PhotoDetails}>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="text-justify">{description}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">
              <Col sm={6}>
                <p className="m-auto">Main feature: {main_feature}</p>
                <p className="m-auto">Location: {location}</p>
                <p className="m-auto">Date: {photo_date}</p>
                <p className="m-auto">Time: {photo_time}</p>
              </Col>
              <Col sm={6}>
                <p className="m-auto">Lens: {lens_used}</p>
                <p className="m-auto">Camera: {camera_used}</p>
                <p className="m-auto">Other: {other_equipment_used}</p>
              </Col>
            </Row>
          </Card.Body>
        </Container>
      }

    </Card >
  )
}

export default Photo