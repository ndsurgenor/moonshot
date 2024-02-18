import React, { useState } from 'react';
import { axiosRes } from '../api/axiosDefaults';

import { useCurrentUser } from '../contexts/CurrentUserContext';

import { Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import styles from '../styles/Comments.module.css'
import buttonStyles from '../styles/Button.module.css'


function CommentAdd(props) {
    const {
        photo,
        setPhoto,
        setComments,
    } = props;
    const [content, setContent] = useState('');
    const currentUser = useCurrentUser()

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post('/comments/', {
                content,
                photo,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPhoto((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <InputGroup className="mt-1 mb-3">
                <FloatingLabel
                    label={`Add comment as ${currentUser?.username}...`}
                    controlId="comment"
                >
                    <Form.Control
                        as="textarea"
                        placeholder="Add comment"
                        name="comment"
                        style={{ height: "5rem" }} // Style height here; not in module.css
                        value={content}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <Button
                    className={`${styles.CommentButton} ${buttonStyles.Button}`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    +
                </Button>
            </InputGroup>
        </Form >
    );
}

export default CommentAdd;