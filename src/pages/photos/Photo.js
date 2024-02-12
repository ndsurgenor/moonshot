import React from 'react';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { Card } from 'react-bootstrap';
import styles from '../../styles/Photo.module.css'


const Photo = (props) => {
  const {
    id,
    user,
    profile_id,
    profile_image,
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

  return (
    <Card className="bg-dark text-white">
      <Card.Img className={styles.PhotoImage} src={image} alt="Photo" />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{main_feature} by {user}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.ImgOverlay>
      <Card.Body></Card.Body>
    </Card>
  )
}

export default Photo