import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { axiosReq } from "../../api/axiosDefaults";

import {
    Container, Col, Row, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import buttonStyles from '../../styles/Button.module.css';


function EquipmentEditForm() {
    const [equipmentData, setEquipmentData] = useState({
        main_lens: '',
        main_camera: '',
        other_equipment: '',
    });
    const {
        main_lens,
        main_camera,
        other_equipment,
    } = equipmentData;

    const [setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/equipment-profiles/${id}/`
                );
                const {
                    main_lens,
                    main_camera,
                    other_equipment,
                    is_owner
                } = data;
                is_owner ? setEquipmentData({
                    main_lens,
                    main_camera,
                    other_equipment,
                }) : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [history, id]);

    const handleChange = (e) => {
        setEquipmentData({
            ...equipmentData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('main_lens', main_lens)
        formData.append('main_camera', main_camera)
        formData.append('other_equipment', other_equipment)

        try {
            await axiosReq.put(`/equipment-profiles/${id}/`, formData);
            history.push(`/user-profiles/${id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    const formFields = (
        < Container>

            <FloatingLabel className="mb-3" label="Main Telescope/Lens" controlId="main_lens">
                <Form.Control
                    type="text"
                    placeholder="lens"
                    name="main_lens"
                    value={main_lens}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Main Camera" controlId="main_camera">

                <Form.Control
                    type="text"
                    placeholder="camera"
                    name="main_camera"
                    value={main_camera}
                    onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Other Equipment" controlId="other_equipment">
                <Form.Control
                    type="text"
                    placeholder="other"
                    name="other_equipment"
                    value={other_equipment}
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
            <Row className="justify-content-center">
                <Col xs={12} className={formStyles.Form}>
                    <h1>Edit Equipment details</h1>
                    <p>
                        Details saved here will auto-populate on the photo upload form
                    </p>
                    {formFields}
                </Col>
            </Row>
        </Form>
    );
}

export default EquipmentEditForm;