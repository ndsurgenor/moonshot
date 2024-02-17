import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';

import { useCurrentUser } from '../contexts/CurrentUserContext'

import Avatar from './Avatar';

import { Container, Row, Col } from 'react-bootstrap';


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
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === user;
    const history = useHistory()

    const handleCommentDelete = async () => {
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
                        <span>{user}</span>
                        <span>Last updated: {updated_at}</span>
                    </Container>
                    <p className="m-0">{content}</p>
                    {is_owner &&
                        <Container className="d-flex justify-content-end g-0">
                            <Link className="me-1" to="/">Edit</Link>|
                            <Link className="ms-1" onClick={handleCommentDelete}>Delete</Link>
                        </Container>
                    }
                </Col>
                <hr className="my-2" />
            </Row>
        </Container>
    );
};

export default Comment;