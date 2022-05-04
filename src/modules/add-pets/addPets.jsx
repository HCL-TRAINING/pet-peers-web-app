import React, { useEffect, useState } from 'react'
import { ToastContainer, Toast, Form, Alert, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import message, { clearMessage } from '../../slices/message';
import { addPet } from '../../slices/pet';

export default function AddPets() {
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    place: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { message } = useSelector((state) => state.message);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    dispatch(clearMessage());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setShowToaster(false);
    dispatch(
      // @ts-ignore
      addPet({
        name: formValues.name,
        age: +formValues.age,
        place: formValues.place,
      })
    )
      .unwrap()
      .then((res) => {
        console.log("res submit", res);
        setLoading(false);
        setShowToaster(true);
      })
      .catch((error) => {
        setLoading(false);
        setShowToaster(false);
      });

    e.preventDefault();
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  return (
    <div className="details position-relative">
      <ToastContainer position="top-end">
        <Toast
          autohide
          show={showToaster}
          onClose={() => {setShowToaster(false)}}
          bg={"success"}
        >
          <Toast.Body className="text-white">
            Hi there, Pet added successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="header d-flex align-items-center mt-3">
        <h3 className="w-100">Add New Pet</h3>
      </div>

      <Form
        className="w-50 m-auto"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        validated={validated}
      >
        <Form.Group
          className="mb-4"
          id="name"
          controlId="validationCustom02"
        >
          <Form.Label className="d-flex">Pet Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Pet Name"
            required
            value={formValues.name}
            onChange={(e) => handleInputChange(e)}
            name="name"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" id="age" controlId="validationCustom03">
          <Form.Label className="d-flex">Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Age"
            required
            value={formValues.age}
            onChange={(e) => handleInputChange(e)}
            name="age"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" id="place" controlId="validationCustom05">
          <Form.Label className="d-flex">Place</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Place"
            required
            value={formValues.place}
            onChange={(e) => handleInputChange(e)}
            name="place"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid place.
          </Form.Control.Feedback>
        </Form.Group>

        {message && (
          <Alert variant="danger" className="mt-2">
            {message}
          </Alert>
        )}

        <Form.Group className="mb-4 d-flex">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button as="input" type="submit" className="mb-4" value="Submit" />
      </Form>
      {loading && (
        <Spinner
          animation="border"
          className="loader position-absolute top-0 bottom-0 start-0 end-0 m-auto"
          variant="primary"
        />
      )}
    </div>
  );
}
