import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import {
    Col, Row, Container, Form, FloatingLabel, Alert, Button,
} from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import buttonStyles from '../../styles/Button.module.css';


const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/')
        } catch (err) {
            setErrors(err.response?.data)
        }
    };

    return (
        <Row>
            <Col>
                <Container className={formStyles.Form}>

                    <h1>Join our community</h1>
                    <p>Sign up for the full experience  - it's free!</p>

                    <Form onSubmit={handleSubmit}>

                        <FloatingLabel className="mb-3" label="Username" controlId="username">
                            <Form.Control
                                type="text"
                                placeholder="username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <FloatingLabel className="mb-3" label="Password" controlId="password1">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <FloatingLabel className="mb-3" label="Confirm Password" controlId="password2">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx} className="mt-3">
                                {message}
                            </Alert>
                        ))}

                        <Button className={buttonStyles.Button} type="submit">
                            Sign Up
                        </Button>

                    </Form>
                </Container>

                <Container className={formStyles.Form}>
                    <h2>Already a member?</h2>
                    <Link className={formStyles.FormLink} to="/signin">
                        Click here to Sign In
                    </Link>
                </Container>

            </Col>
        </Row>
    );
};

export default SignUpForm;