import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

import { useCurrentUser } from '../contexts/CurrentUserContext';

import Avatar from './Avatar';
import CommentEditForm from './CommentEdit';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from '../styles/Comments.module.css';


const Comment = (props) => {
    const {
        user,
        user_id,
        user_avatar,
        id,
        content,
        updated_at,
        setPhoto,
        setComments
    } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === user;

    const handleCommentDelete = async (e) => {
        e.preventDefault();
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPhoto((prevPhoto) => ({
                results: [{
                    ...prevPhoto.results[0],
                    comments_count: prevPhoto.results[0].comments_count - 1,
                }]
            }));
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter(
                    (comment) => comment.id !== id
                )
            }));
        } catch (err) { }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} sm={2} lg={1} className="d-flex">
                    <Link className="m-auto ms-0" to={`/user-profiles/${user_id}`}>
                        <Avatar src={user_avatar} />
                        <p className={styles.CommentUser}>
                            {user}
                        </p>
                    </Link>
                </Col>
                <Col xs={12} sm={10} lg={11} className="d-block">
                    <p className={styles.CommentUpdated}>
                        Last updated: {updated_at}
                    </p>
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            user_id={user_id}
                            content={content}
                            user_avatar={user_avatar}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p className="text-end mb-1">{content}</p>
                    )}
                    {is_owner && !showEditForm && (
                        <Container className="d-flex justify-content-end g-0">
                            <span
                                className={`${styles.CommentLink} me-1`}
                                onClick={() => setShowEditForm(true)}
                            >
                                Edit
                            </span>|
                            <span
                                className={`${styles.CommentLink} ms-1`}
                                onClick={handleCommentDelete}
                            >
                                Delete
                            </span>
                        </Container>
                    )}
                </Col>
                <hr className="my-2" />
            </Row>
        </Container>
    );
};

export default Comment;