import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from "../../api/axiosDefaults";

import Avatar from "../../components/Avatar";
import { Form, InputGroup, Button } from 'react-bootstrap';

import styles from '../../styles/Comments.module.css';
import buttonStyles from '../../styles/Button.module.css'


function AddCommentForm(props) {
    const {
        photo,
        setPhoto,
        setComments,
        profileImage,
        profile_id
    } = props;
    const [content, setContent] = useState('');

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
            <Form.Group>
                <InputGroup>
                    <Link to={`/user-profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="Add your comment here"
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <Button
                className={buttonStyles.Button}
                disabled={!content.trim()}
                type="submit"
            >
                Add+
            </Button>
        </Form >
    );
}

export default AddCommentForm;