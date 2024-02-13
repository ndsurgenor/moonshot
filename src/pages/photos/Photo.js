import React from 'react';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar'

import { Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../../styles/Photo.module.css'

import { FaCommentAlt, FaRegStar, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';


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
    updated_at,
    photoPage,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;

  // At width < 767px first Card.Title displays (cancelled by 'd-md-none')
  // Title in Container is hidden via media query in Photo.module.css
  return (<>
    {is_owner && photoPage && '...'}
    <Card.Title className="d-md-none mt-3 ms-1">
      <h4>{title}</h4>
    </Card.Title>
    <Card className="mx-auto mt-md-3 bg-dark text-white">
      <Link to={`/photos/${id}`}>
        <Card.Img src={image} alt="Photo" />
      </Link>
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
        <Card.Text>{description}</Card.Text>
      </Card.ImgOverlay>
      <Card.Body>

        <p>Main feature: {main_feature}</p>
        <p>Location: {location}</p>
        <p>Date: {photo_date}</p>
        <p>Time: {photo_time}</p>
        <p>Lens: {lens_used}</p>
        <p>Camera: {camera_used}</p>
        <p>Other: {other_equipment_used}</p>
      </Card.Body>
    </Card>

    <div>
      {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>You can't add a star to your own post</Tooltip>
          }
        >
          <span><FaStar /></span>
        </OverlayTrigger>
      ) : star_id ? (
        <span onClick={() => { }}><FaRegStar /></span>
      ) : currentUser ? (
        <span onClick={() => { }}><FaStar /></span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>You must sign in to add a star</Tooltip>
          }
        >
          <span><FaStar /></span>
        </OverlayTrigger>
      )}
      {star_count}
      <Link to={`/photos/${id}`}>
        <FaCommentAlt />
      </Link>
      {comment_count}
    </div>
  </>
  )
}

export default Photo