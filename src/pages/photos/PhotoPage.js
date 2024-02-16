import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import PhotoCard from './PhotoCard';
import AddCommentForm from "../comments/AddCommentForm";
import Comment from '../../components/Comment'

import { Container, Row, Col } from 'react-bootstrap';


function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: photo }, { data: comments }] = await Promise.all([
          axiosReq.get(`/photos/${id}`),
          axiosReq.get(`/comments/?photo=${id}`)
        ])
        setPhoto({ results: [photo] });
        setComments(comments);
      } catch (err) {
        console.log(err)
      }
    }
    handleMount()
  }, [id])

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={11} sm={12} md={10} lg={9} xl={8} xxl={7}>

        {/* Photo & Details */}
        <PhotoCard
          {...photo.results[0]}
          setPhotos={setPhoto}
          photoPage
        />

        {/* Comment Section */}
        <Container className="mb-3">
          {/* Add Comment Form */}
          {currentUser ? (
            <AddCommentForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              photo={id}
              setPhoto={setPhoto}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <h3>Comments</h3>
          ) : null}
          {/* Comments */}
          <h4>Comments</h4>
          <hr className="mt-0 mb-2" />
          {comments.results.length ? (
            comments.results.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : currentUser ? (
            <span>No comments yet. Add the first one above.</span>
          ) : (
            <span>
              No comments yet. <Link to="/signin">Sign in</Link> to add the first one!
            </span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PhotoPage;