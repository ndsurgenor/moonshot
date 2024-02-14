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

  // At width < 767px first Card.Title displays (cancelled by 'd-md-none')
  // Title in Container is hidden via media query in Photo.module.css
  return (<>
    {is_owner && photoPage && '...'}
    <Card.Title className="d-md-none mt-3 ms-1">
      <h4>{title}</h4>
    </Card.Title>
    <Card className="mx-auto mt-md-3 bg-dark text-white">

      {/* Image */}
      <Card.Img src={image} alt="Photo" />

      {/* Title & Subtitle */}
      <Link to={`/photos/${id}`}>
        <Card.ImgOverlay>
          <Container className={styles.PhotoHeader}>
            <Card.Title className={styles.PhotoTitle}>
              <h4>{title}</h4>
            </Card.Title>
            <Link to={`/user-profiles/${user_id}`}>
              <Card.Subtitle className={styles.PhotoSubtitle}>
                <span className="me-2">{user}</span>
                <Avatar src={user_avatar} height={30} />
              </Card.Subtitle>
            </Link>
          </Container>
        </Card.ImgOverlay>
      </Link>

      {/* Stars & Comments */}
      <Container className={styles.PhotoFooter}>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={
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
            placement="top"
            overlay={
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

      {/* Photo Info */}
      <Card.Text>{description}</Card.Text>
      <Card.Body>
        <Row>
          <Col sm={6}>
            <p>Main feature: {main_feature}</p>
            <p>Location: {location}</p>
            <p>Date: {photo_date}</p>
            <p>Time: {photo_time}</p>
          </Col>
          <Col sm={6}>
            <p>Lens: {lens_used}</p>
            <p>Camera: {camera_used}</p>
            <p>Other: {other_equipment_used}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card >
  </>
  )
}

export default Photo