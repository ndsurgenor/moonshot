import React from 'react'
import { Link } from 'react-router-dom';

import {useCurrentUser} from '../contexts/CurrentUserContext'

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
                <hr />
                <Col xs={1}>
                    <Link to={`/user-profiles/${user_id}`}>
                        <Avatar src={user_avatar}/>
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