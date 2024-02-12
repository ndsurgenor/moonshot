import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";

import formStyles from "../../styles/Form.module.css";
import buttonStyles from "../../styles/Button.module.css";
import {
    Col, Row, Container, Form, FloatingLabel, Alert, Button,
} from "react-bootstrap";


function SignInForm() {
    const setCurrentUser = useSetCurrentUser();  
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = signInData; 

    const [errors, setErrors] = useState({});  
    const history = useHistory();
    
    const handleChange = (e) => {
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user);
            history.push('/')
        } catch (err) {
            setErrors(err.response?.data)
        }
    };

    return (
        <Row>
            <Col>
                <Container className={formStyles.Form}>

                    <h1>Access your account</h1>
                    <p>Sign in to share and connect</p>

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

                        <FloatingLabel className="mb-3" label="Password" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        {errors.password?.map((message, idx) => (
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
                            Sign In
                        </Button>

                    </Form>
                </Container>

                <Container className={formStyles.Form}>
                    <h2>Haven't joined us yet?</h2>
                    <Link className={formStyles.FormLink} to="/signup">
                        Click here to Sign Up
                    </Link>
                </Container>

            </Col>
        </Row>
    );
};

export default SignInForm;