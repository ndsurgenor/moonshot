import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

import { useCurrentUser } from '../contexts/CurrentUserContext'

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
                <Col xs={1} className="mt-1 g-0">
                    <Link to={`/user-profiles/${user_id}`}>
                        <Avatar src={user_avatar} />
                    </Link>
                </Col>
                <Col xs={11}>
                    <Container className="d-flex justify-content-between mb-1 g-0">
                        <span className={styles.CommentUser}>{user}</span>
                        <span className={styles.CommentUpdated}>Last updated: {updated_at}</span>
                    </Container>
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
                        <p className="m-0">{content}</p>
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