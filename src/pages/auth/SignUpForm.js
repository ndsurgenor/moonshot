import React from "react";
import { Link } from "react-router-dom";

// import appStyles from "../../App.module.css";
import {
    Col, Row, Container, Form, FloatingLabel, Button
} from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Row>
            <Col>
                <Container>
                    <h1>Join our community</h1>
                    <Form>
                        <FloatingLabel label="Username" className="mb-3" controlId="username">
                            <Form.Control type="text" placeholder="username" name="username" />
                        </FloatingLabel>
                        <FloatingLabel label="Password" className="mb-3" controlId="password">
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </FloatingLabel>
                        <FloatingLabel label="Confirm Password" className="mb-3" controlId="password2">
                            <Form.Control type="password" placeholder="Confirm Password" name="password2" />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <h2>Already a member?</h2>
                    <Link>
                        <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
        </Row>
    );
};

export default SignUpForm;