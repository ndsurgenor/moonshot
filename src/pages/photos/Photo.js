import React from 'react';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar'

import { Card, Container } from 'react-bootstrap';
import styles from '../../styles/Photo.module.css'


const Photo = (props) => {
  const {
    id,
    user,
    profile_id,
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
    created_at,
    updated_at,
  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;
  
  // At width < 767px first Card.Title displays ('d-md-none' cancels)
  // Title in Container is hidden via media query in module.css file
  return (<>
    <Card.Title className="d-md-none mt-3 ms-1">
      <h4>{title}</h4>
    </Card.Title>
    <Card className="mx-auto mt-md-3 bg-dark text-white">
      <Card.Img src={image} alt="Photo" />
      <Card.ImgOverlay>
        <Container className={styles.PhotoHeader}>
          <Card.Title className={styles.PhotoTitle}>
            <h4>{title}</h4>
          </Card.Title>
          <Card.Subtitle className={styles.PhotoSubtitle}>
            <span className="me-2">{user}</span>
            <Avatar src={user_avatar} height={30} />
          </Card.Subtitle>
        </Container>
        <Card.Text>{description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  </>
  )
}

export default Photo