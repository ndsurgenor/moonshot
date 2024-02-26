import React, { useState } from 'react';
import { axiosRes } from '../api/axiosDefaults';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Comments.module.css';


function CommentEditForm(props) {
    const {
        id,
        content,
        setShowEditForm,
        setComments
    } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (e) => {
        setFormContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "just now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Form>
            <Form.Control
                as="textarea"
                style={{ height: "4rem" }} // Style height here; not in module.css
                value={formContent}
                onChange={handleChange}
            />
            <Container className="d-flex justify-content-end g-0">
                <span
                    className={`${styles.CommentLink} me-1`}
                    onClick={handleSubmit}
                >
                    Save
                </span>|
                <span
                    className={`${styles.CommentLink} ms-1`}
                    onClick={() => setShowEditForm(false)}
                >
                    Cancel
                </span>
            </Container>
        </Form>
    );
}

export default CommentEditForm;