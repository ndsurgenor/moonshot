import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { getMoreData } from '../../utils/Utils';

import PhotoCard from '../../components/PhotoCard';
import CommentAdd from "../../components/CommentAdd";
import Comment from '../../components/Comment'
import Asset from '../../components/Asset';

import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/Comments.module.css'


function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

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
        // console.log(err)
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
            <CommentAdd
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              photo={id}
              setPhoto={setPhoto}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <p className="text-center mt-2">
              You need to<Link className={styles.CommentLink} to="/signup">sign up</Link>
              or<Link className={styles.CommentLink} to="/signin">sign in</Link>
              to add comments
            </p>
          ) : null}
          {/* Comments */}
          <h4>Comments</h4>
          <hr className="mt-0 mb-2" />
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map(comment => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPhoto={setPhoto}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => getMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet. Be the first.</span>
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

export default PhotoDetail;