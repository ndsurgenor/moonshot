import React, { useState } from "react";

import Upload from "../../assets/photo_upload.png";
import {
    Col, Row, Container, Form, FloatingLabel, Alert, Button,
} from "react-bootstrap";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function UploadForm() {

  const [errors, setErrors] = useState({});


  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Upload
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  ASSET
                </Form.Label>

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default UploadForm;