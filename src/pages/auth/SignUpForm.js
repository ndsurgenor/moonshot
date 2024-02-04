import React from "react";
import { Link } from "react-router-dom";

import {
    Col, Row, Container, Form, FloatingLabel, Button
} from "react-bootstrap";
import appStyles from "../../App.module.css";

const SignUpForm = () => {
    return (
        <Row>
            <Col>
                <Container className={appStyles.Form}>
                    <h1>Join our community</h1>
                    <p>Sign up for the full experience  - it's free!</p>
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

                        <Button className={appStyles.Button} type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
                <Container className={appStyles.Form}>
                    <h2>Already a member?</h2>
                    <Link className={appStyles.FormLink}>
                        Click here to Sign In
                    </Link>
                </Container>
            </Col>
        </Row>
    );
};

export default SignUpForm;