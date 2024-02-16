import React from 'react'
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

import { Container, Row, Col } from 'react-bootstrap';


const Comment = (props) => {
    const {
        profile_id,
        user_avatar,
        user,
        updated_at,
        content
    } = props;

    return (
        <Container>
            <Row>
                <hr />
                <Col xs={1}>
                    <Link to={`/user-profiles/${profile_id}`}>
                        <Avatar src={user_avatar} height={30} />
                    </Link>
                </Col>
                <Col className="align-self-center ml-2">
                    <span>{user}</span>
                    <span>{updated_at}</span>
                    <p>{content}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Comment;