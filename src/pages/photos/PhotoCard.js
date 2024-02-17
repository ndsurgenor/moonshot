import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Avatar from '../../components/Avatar'

import {
  Container, Row, Col, Card, OverlayTrigger, Tooltip, Button, Modal
} from 'react-bootstrap';
import styles from '../../styles/PhotoCard.module.css'
import buttonStyles from '../../styles/Button.module.css'

import { CgComment } from "react-icons/cg";
import { FaEdit, FaRegStar, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PiWarningFill } from "react-icons/pi";


const PhotoCard = (props) => {
  const {
    image,
    id,
    user,
    user_avatar,
    user_id,
    star_count,
    star_id,
    comment_count,
    title,
    description,
    main_feature,
    location,
    photo_date,
    photo_time,
    lens_used,
    camera_used,
    other_equipment_used,
    photoPage,
    setPhotos,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const handlePhotoEdit = () => {
    history.push(`/photos/${id}/edit`)
  };

  const handlePhotoDelete = async () => {
    try {
      await axiosRes.delete(`/photos/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

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
  };
  
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
  };

  return (
    <Card className="mt-2 mx-1 bg-dark text-white" data-backdrop="false">

      {/* Edit/Delete Buttons: only shown to owner on Photo Page */}
      {is_owner && photoPage &&
        <Col className="d-flex justify-content-center ms-2 my-2">
          <Button className={buttonStyles.Button} onClick={handlePhotoEdit}>
            <FaEdit className="mb-1" /> Edit
          </Button>
          <Button className={buttonStyles.Button} onClick={handleModalShow}>
            <FaRegTrashAlt className="mb-1" /> Delete
          </Button>
        </Col>}

      {/* Modal for deletion confirmation/cancellation */}
      <Modal size="sm" show={show} onHide={handleModalClose}>
        <Modal.Header className="m-auto" >
          <Modal.Title>
            <PiWarningFill className={`${styles.PhotoStarred} mb-1 me-1`} />Take Care
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" >
          Are you absolutely sure you want to delete this photo? It can't be undone!
        </Modal.Body>
        <Modal.Footer className="m-auto" >
          <Button className={buttonStyles.Button} onClick={handleModalClose}>
            <ImCancelCircle className="mb-1" /> Cancel
          </Button>
          <Button className={buttonStyles.Button} onClick={handlePhotoDelete}>
            <FaRegTrashAlt className="mb-1" /> Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Photo */}
      <Link to={`/photos/${id}`}>
        <Card.Img src={image} alt="Photo" />
        <Card.ImgOverlay>

          {/* Photo Owner: always shown on Home Page, but
          only shown on Photo Page when user is not owner */}
          {(!photoPage || (!is_owner && photoPage)) &&
            <Link to={`/user-profiles/${user_id}`}>
              <Container className="d-flex g-0">
                <Card.Subtitle className={styles.PhotoOwner}>
                  <span className="me-1">{user}</span>
                  <Avatar src={user_avatar} height={30} />
                </Card.Subtitle>
              </Container>
            </Link>}

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

      {/* Photo Details: not displayed in feeds) */}
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

export default PhotoCard