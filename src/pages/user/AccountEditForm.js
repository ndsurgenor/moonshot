import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { axiosReq } from "../../api/axiosDefaults";

import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import formStyles from '../../styles/Form.module.css';
import avatarStyles from '../../styles/Avatar.module.css';
import buttonStyles from '../../styles/Button.module.css';


const AccountEditForm = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        details: "",
        avatar: "",
    });
    const {
        name,
        details,
        avatar,
    } = profileData;

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();
    const [errors, setErrors] = useState({});

    const successNotify = () => toast.success(
        "Account details updated successfully"
    );
    const errorNotify = () => toast.error(
        "An error occured while attempting to save. Please try again"
    );

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(
                        `/user-profiles/${id}/`
                    );
                    const {
                        name,
                        details,
                        avatar,
                    } = data;
                    setProfileData({
                        name,
                        details,
                        avatar,
                    });
                } catch (err) {
                    // console.log(err);                    
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAvatar = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(avatar);
            setProfileData({
                ...profileData,
                avatar: URL.createObjectURL(e.target.files[0])
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (imageFile?.current?.files[0]) {
            formData.append("avatar", imageFile?.current?.files[0]);
        }
        formData.append("name", name);
        formData.append("details", details);

        try {
            const { data } = await axiosReq.put(
                `/user-profiles/${id}/`, formData
            );
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.avatar,
            }));
            history.push(`/user-profiles/${id}`);
            successNotify();
        } catch (err) {
            // console.log(err);
            errorNotify();
            setErrors(err.response?.data);
        }
    };

    const avatarFields = (
        < Container>

            <FloatingLabel className="mb-3" label="Name" controlId="name">
                <Form.Control
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Personal Details" controlId="details">
                <Form.Control
                    type="text"
                    placeholder="details"
                    name="details"
                    value={details}
                    onChange={handleChange} />
            </FloatingLabel>

            <Button
                className={buttonStyles.Button}
                onClick={() => history.push(`/user-profiles/${id}`)}
            >
                Cancel
            </Button>
            <Button
                className={buttonStyles.Button}
                type="submit"
            >
                Save
            </Button>

        </Container >
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
                <Col xs={12} className={formStyles.Form}>
                    <h1>Edit account details</h1>
                    <p>
                        Details added here will appear on your profile page
                    </p>
                    <Form.Control
                        className="mb-2"
                        type="file"
                        id="image-upload"
                        ref={imageFile}
                        accept="image/*"
                        onChange={handleChangeAvatar}
                    />
                    <Form.Group>
                        {avatar && (
                            <Form.Label
                                className={formStyles.FormLink}
                                htmlFor="photo-upload">
                                <Image
                                    className={avatarStyles.AvatarImage}
                                    src={avatar}
                                    fluid
                                />
                            </Form.Label>
                        )}
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                    </Form.Group>
                    {avatarFields}
                </Col>
            </Row>
        </Form>
    );
}

export default AccountEditForm;