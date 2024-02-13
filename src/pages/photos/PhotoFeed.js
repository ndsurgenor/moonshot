import React from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';

import styles from "../../styles/PhotoFeed.module.css";


function PostsPage() {
  
  return (
    <Row className="h-100">
      <Col>
        <p>List of posts here</p>
      </Col>
      <Col md={4} className="d-none d-lg-block">
      </Col>
    </Row>
  );
}

export default PostsPage;