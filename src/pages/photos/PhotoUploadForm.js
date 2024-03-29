import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { axiosReq } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';

import Upload from '../../assets/photo-upload.png';
import Asset from '../../components/Asset';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import formStyles from '../../styles/Form.module.css';
import buttonStyles from '../../styles/Button.module.css';


function PhotoUploadForm() {
  useRedirect("signedOut");

  const history = useHistory();
  const currentUser = useCurrentUser();
  const id = currentUser?.profile_id
  const [gearData, setGearData] = useState({})

  useEffect(() => {
    const handleMount = async () => {
      if (id) try {
        const { data } = await axiosReq.get(
          `/equipment-profiles/${id}/`
        );
        setGearData(data)
        setUploadData(prevDetails => ({
          ...prevDetails,
          lens_used: data.main_lens,
          camera_used: data.main_camera,
          other_equipment_used: data.other_equipment
        }))
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const [uploadData, setUploadData] = useState({
    title: '',
    main_feature: '',
    location: '',
    photo_date: '',
    photo_time: '',
    description: '',
    lens_used: gearData.main_lens,
    camera_used: gearData.main_camera,
    other_equipment_used: gearData.other_equipment,
    image: '',
  });
  const {
    title,
    main_feature,
    location,
    photo_date,
    photo_time,
    description,
    lens_used,
    camera_used,
    other_equipment_used,
    image,
  } = uploadData;

  const photoInput = useRef(null);
  const [errors, setErrors] = useState({});

  const uploadNotify = () => toast.info(
    "Uploading photo...", { autoClose: 1750 });
  const successNotify = () => toast.success(
    "Photo uploaded successfully", { delay: 2500 });
  const errorNotify = () => toast.error(
    "Error occured attempting upload. Please alter details and try again",
    toast.dismiss()
  );

  const handleChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    })
  };

  const handleChangePhoto = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setUploadData({
        ...uploadData,
        image: URL.createObjectURL(e.target.files[0])
      })
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();

    formData.append('image', photoInput.current.files[0])
    formData.append('title', title)
    formData.append('main_feature', main_feature)
    formData.append('location', location)
    formData.append('photo_date', photo_date)
    formData.append('photo_time', photo_time)
    formData.append('description', description)
    formData.append('lens_used', lens_used)
    formData.append('camera_used', camera_used)
    formData.append('other_equipment_used', other_equipment_used)

    try {
      uploadNotify();
      const { data } = await axiosReq.post('/photos/', formData);
      history.push(`/photos/${data.id}`);
      successNotify();
    } catch (err) {
      // console.log(err);
      errorNotify();
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
          <option value="Unspecified">(Select an option)</option>
          <option value="aurora">Aurora</option>
          <option value="deep-sky">Deep-sky</option>
          <option value="moon">Moon</option>
          <option value="nightscape">Nightscape</option>
          <option value="planet">Planet</option>
          <option value="stars">Stars</option>
          <option value="other">[Other]</option>
        </Form.Select>
      </FloatingLabel>
      {errors.main_feature?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <FloatingLabel className="mb-3" label="Location*" controlId="location">
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

      <FloatingLabel
        className={formStyles.FormDateTime}
        label="Date Taken*"
        controlId="photo_date"
      >
        <Form.Control
          type="date"
          placeholder="date"
          name="photo_date"
          value={photo_date}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel
        className={formStyles.FormDateTime}
        label="Time Taken*"
        controlId="photo_time"
      >
        <Form.Control
          type="time"
          placeholder="time"
          name="photo_time"
          value={photo_time}
          onChange={handleChange}
        />
      </FloatingLabel>

      <div className="d-inline-flex mb-3">
        <Form.Text muted>
          Leaving blank applies today's date/current time
        </Form.Text>
      </div>

      {errors.date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {errors.time?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <FloatingLabel className="mb-3" label="Photo Description" controlId="description">
        <Form.Control
          as="textarea"
          placeholder="Describe your photo here"
          name="description"
          style={{ height: "6rem" }} // Style height here; not in module.css
          value={description}
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
        Submit
      </Button>

    </Container >
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className={formStyles.Form}>
          <h1>Enter photo details</h1>
          <p>Fields marked with * are required</p>
          <Form.Control
            type="file"
            accept="image/*"
            id="photo-upload"
            onChange={handleChangePhoto}
            ref={photoInput}
          />
          <Form.Group className="mt-3" >
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {image ? (
              <>
                <Form.Label
                  className={formStyles.FormLink}
                  htmlFor="photo-upload"
                >
                  <Image src={image} fluid rounded />
                </Form.Label>
                <p>Click 'Choose File' or the image itself to select a different photo</p>
              </>
            ) : (
              <>
                <Form.Label
                  className={formStyles.FormLink}
                  htmlFor="photo-upload"
                >
                  <Asset src={Upload} />
                </Form.Label>
                <p>Preview appears above once photo is chosen.
                  Photos must be between 500-7680px in width/height
                  and no larger than 4MB.</p>
              </>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className={formStyles.Form}>
          {formFields}
        </Col>
      </Row>
    </Form>
  );
}

export default PhotoUploadForm;