import React from 'react'
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';


const Filters = () => {
    return (
        <Container>
            <Link to="/">All Photos</Link>
            <Link to="/photos/filtered/user-uploads">My Uploads</Link>
            <Link to="/photos/filtered/stars-received">Stars Received</Link>
            <Link to="/photos/filtered/comments-received">Comments Received</Link>
            <Link to="/photos/filtered/stars-given">Stars Given</Link>
            <Link to="/photos/filtered/comments-given">Comments Given</Link>
        </Container>
    )
}

export default Filters;