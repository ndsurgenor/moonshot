import React, { useState } from "react";

import Upload from "../../assets/photo_upload.png";
import Asset from "../../components/Asset";

import {
  Col, Row, Container, Image, Form, FloatingLabel, Button,
} from "react-bootstrap";
import formStyles from "../../styles/Form.module.css"
import buttonStyles from "../../styles/Button.module.css";


function UploadForm() {
  const [uploadData, setUploadData] = useState({
    title: '',
    feature: '',
    description: '',
    location: '',
    date: '',
    time: '',
    lens: '',
    camera: '',
    other: '',
  });
  const {
    photo,
    title,
    feature,
    description,
    location,
    date,
    time,
    lens,
    camera,
    other
  } = uploadData;

  // const [errors, setErrors] = useState({});
  // const history = useHistory();

  const handleChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    })
  };

  const handleChangePhoto = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(photo);
      setUploadData({
        ...uploadData,
        photo: URL.createObjectURL(e.target.files[0])
      })
    }
  };

  const formFields = (
      < Container>

        <Form>
          <FloatingLabel className="mb-3" label="Title*" controlId="title">
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Main Feature*" controlId="feature">
            <Form.Select
              type="dropdown"
              placeholder="feature"
              name="feature"
              value={feature}
              onChange={handleChange}
            >
              <option>(please select an option)</option>
              <option value="aurora">Aurora</option>
              <option value="constellation">Constellation</option>
              <option value="deep_sky">Deep-sky</option>
              <option value="moon">Moon</option>
              <option value="nightscape">Nightscape</option>
              <option value="planet">Planet</option>
              <option value="other">(Other)</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Description" controlId="description">
            <Form.Control
              as="textarea"
              placeholder="Describe your photo here"
              name="description"
              style={{ height: "10rem" }} // Style here rather than in module.css
              value={description}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Location" controlId="location">
            <Form.Control
              type="text"
              placeholder="location"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Date Taken" controlId="date">
            <Form.Control
              type="date"
              placeholder="date"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Time Taken" controlId="time">
            <Form.Control
              type="time"
              placeholder="time"
              name="time"
              value={time}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Lens Used" controlId="lens">
            <Form.Control
              type="text"
              placeholder="lens"
              name="lens"
              value={lens}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Camera Used" controlId="camera">
            <Form.Control
              type="text"
              placeholder="camera"
              name="camera"
              value={camera}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-3" label="Other Equipment" controlId="other">
            <Form.Control
              type="text"
              placeholder="other"
              name="other"
              value={other}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Button className={buttonStyles.Button} onClick={() => { }}>
            Clear Details
          </Button>
          <Button className={buttonStyles.Button} type="submit">
            Upload Photo
          </Button>

        </Form>
      </Container >
  );

  return (
    <Form>
      <Row>
        <Col>
          <h1>Enter photo details below</h1>
          <p>Fields marked with * are required</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className={formStyles.Form}>
            <Form.Group>
              {photo ? (
                <>
                  <Image src={photo} fluid rounded />
                  <Form.Label htmlFor="photo-upload">
                    Choose a different photo
                  </Form.Label>
                </>
              ) : (
                <>
                  <Form.Label htmlFor="photo-upload">
                    <Asset
                      src={Upload}
                      message="Tap/click above to select photo"
                    />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    controlId="photo"
                    onChange={handleChangePhoto}
                  />
                </>
              )}
            </Form.Group>
          </Container>
        </Col>
        <Col>
          {formFields}
        </Col>
      </Row>
    </Form>
  );
}

export default UploadForm;