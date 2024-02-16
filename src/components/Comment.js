import React from 'react'
import { Link } from 'react-router-dom';

import { useCurrentUser } from '../contexts/CurrentUserContext'

import Avatar from './Avatar';

import { Container, Row, Col } from 'react-bootstrap';


const Comment = (props) => {
    const {
        user,
        user_id,
        user_avatar,
        updated_at,
        content
    } = props;

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === user;

    return (
        <Container>
            <Row>
                <Col xs={1} className="mt-1">
                    <Link to={`/user-profiles/${user_id}`}>
                        <Avatar src={user_avatar} />
                    </Link>
                </Col>
                <Col>
                    <Container className="d-inline-flex justify-content-between g-0">
                        <span className="text-end">{user}</span>
                        <span className="text-end">Last updated: {updated_at}</span>
                    </Container>
                    <p className="m-0">{content}</p>
                    {is_owner &&
                        <Container className="d-flex justify-content-end g-0">
                            <Link className="me-1" to="/">Edit</Link>|
                            <Link className="ms-1" to="/">Delete</Link>
                        </Container>
                    }
                </Col>
                <hr className="mb-2" />
            </Row>
        </Container>
    );
};

export default Comment;