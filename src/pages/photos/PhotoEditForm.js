import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { axiosReq } from "../../api/axiosDefaults";

import {
    Col, Row, Container, Image, Form, FloatingLabel, Alert, Button,
} from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import buttonStyles from '../../styles/Button.module.css';


function PhotoEditForm() {
    const [uploadData, setUploadData] = useState({
        title: '',
        main_feature: '',
        description: '',
        location: '',
        photo_date: '',
        photo_time: '',
        lens_used: '',
        camera_used: '',
        other_equipment_used: '',
        image: '',
    });
    const {
        title,
        main_feature,
        description,
        location,
        photo_date,
        photo_time,
        lens_used,
        camera_used,
        other_equipment_used,
        image,
    } = uploadData;

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/photos/${id}/`);
                const {
                    title,
                    main_feature,
                    description,
                    location,
                    photo_date,
                    photo_time,
                    lens_used,
                    camera_used,
                    other_equipment_used,
                    image,
                    is_owner
                } = data;
                is_owner ? setUploadData({
                    title,
                    main_feature,
                    description,
                    location,
                    photo_date,
                    photo_time,
                    lens_used,
                    camera_used,
                    other_equipment_used,
                    image
                }) : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [history, id]);

    const handleChange = (e) => {
        setUploadData({
            ...uploadData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title)
        formData.append('main_feature', main_feature)
        formData.append('description', description)
        formData.append('location', location)
        formData.append('photo_date', photo_date)
        formData.append('photo_time', photo_time)
        formData.append('lens_used', lens_used)
        formData.append('camera_used', camera_used)
        formData.append('other_equipment_used', other_equipment_used)

        try {
            await axiosReq.put(`/photos/${id}/`, formData);
            history.push(`/photos/${id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    const formFields = (
        < Container>

            <FloatingLabel className="mb-3" label="Title*" controlId="title">
                <Form.Control
                    type="text"
                    placeholder="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </FloatingLabel>
            {errors.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <FloatingLabel className="mb-3" label="Main Feature*" controlId="main_feature">
                <Form.Select
                    type="dropdown"
                    placeholder="feature"
                    name="main_feature"
                    value={main_feature}
                    onChange={handleChange}
                >
                    <option>(please select an option)</option>
                    <option value="aurora">Aurora</option>
                    <option value="deep_sky">Deep-sky</option>
                    <option value="moon">Moon</option>
                    <option value="nightscape">Nightscape</option>
                    <option value="planet">Planet</option>
                    <option value="stars">Stars</option>
                    <option value="other">(Other)</option>
                </Form.Select>
            </FloatingLabel>
            {errors.main_feature?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <FloatingLabel className="mb-3" label="Description" controlId="description">
                <Form.Control
                    as="textarea"
                    placeholder="Describe your photo here"
                    name="description"
                    style={{ height: "6rem" }} // Style height here; not in module.css
                    value={description}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Photo Location*" controlId="location">
                <Form.Control
                    type="text"
                    placeholder="location"
                    name="location"
                    value={location}
                    onChange={handleChange}
                />
            </FloatingLabel>
            {errors.location?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <FloatingLabel className="d-inline-flex w-50 mb-3" label="Date Taken" controlId="photo_date">
                <Form.Control
                    type="date"
                    placeholder="date"
                    name="photo_date"
                    value={photo_date}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="d-inline-flex w-50 mb-3" label="Time Taken" controlId="photo_time">
                <Form.Control
                    type="time"
                    placeholder="time"
                    name="photo_time"
                    value={photo_time}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Telescope/Lens Used" controlId="lens_used">
                <Form.Control
                    type="text"
                    placeholder="lens"
                    name="lens_used"
                    value={lens_used}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Camera Used" controlId="camera_used">
                <Form.Control
                    type="text"
                    placeholder="camera"
                    name="camera_used"
                    value={camera_used}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Other Equipment" controlId="other_equipment_used">
                <Form.Control
                    type="text"
                    placeholder="other"
                    name="other_equipment_used"
                    value={other_equipment_used}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <Button className={buttonStyles.Button} onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button className={buttonStyles.Button} type="submit">
                Save
            </Button>

        </Container >
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6} className={formStyles.Form}>
                    <h1>Edit photo details</h1>
                    <p>Fields marked with * are required</p>
                    <Form.Group className="mt-3" >
                        <Image src={image} fluid rounded />
                        <Form.Label className="mt-3" htmlFor="photo-upload">
                            Note that it is not possible to change photo with this form.
                            If you require a different photo, please add it as a new upload.
                        </Form.Label>
                    </Form.Group>
                </Col>
                <Col md={6} className={formStyles.Form}>
                    {formFields}
                </Col>
            </Row>
        </Form>
    );
}

export default PhotoEditForm;