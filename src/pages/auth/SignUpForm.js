import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import appStyles from "../../App.module.css";
import {
    Col, Row, Container, Form, FloatingLabel, Alert, Button, 
} from "react-bootstrap";


const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });

    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory;

    const handleChange = (e) => {
        setSignUpData({
            ...signUpData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push('/');
        } catch (err) {
            setErrors(err.reponse?.data);
        }
    };

    return (
        <Row>
            <Col>
                <Container className={appStyles.Form}>

                    <h1>Join our community</h1>
                    <p>Sign up for the full experience  - it's free!</p>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="username">
                            <FloatingLabel label="Username" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password1">
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="password2">
                            <FloatingLabel label="Confirm Password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Button className={appStyles.Button} type="submit">
                            Sign Up
                        </Button>

                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx} className="mt-3">
                                {message}
                            </Alert>
                        ))}

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