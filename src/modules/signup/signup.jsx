import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  // @ts-ignore
  const { message } = useSelector((state) => state.message);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    dispatch(clearMessage());
    if (form.checkValidity() === false || formValues.password !== formValues.confirmPassword) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setShowToaster(false);
    dispatch(
      // @ts-ignore
      register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
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

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (
            formValues.confirmPassword &&
            value !== formValues.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = formValues.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (formValues.password && value !== formValues.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className="details position-relative">
      <ToastContainer position="top-end">
        <Toast
          autohide
          show={showToaster}
          onClose={() => setShowToaster(false)}
          bg={"success"}
        >
          <Toast.Body className="text-white">
            Hi there, User registered successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="header d-flex align-items-center mt-3">
        <h3 className="w-100">Create a New Account</h3>
      </div>

      <Form
        className="w-50 m-auto"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        validated={validated}
      >
        <Form.Group
          className="mb-4"
          id="username"
          controlId="validationCustom02"
        >
          <Form.Label className="d-flex">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            required
            value={formValues.username}
            onChange={(e) => handleInputChange(e)}
            name="username"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" id="email" controlId="validationCustom03">
          <Form.Label className="d-flex">Email Id</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Id"
            required
            value={formValues.email}
            onChange={(e) => handleInputChange(e)}
            name="email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email id.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" id="pwd" controlId="validationCustom05">
          <Form.Label className="d-flex">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={formValues.password}
            onChange={(e) => handleInputChange(e)}
            name="password"
            onBlur={validateInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          {error.password && <span className='err'>{error.password}</span>}
        </Form.Group>

        <Form.Group
          className="mb-4"
          id="confirmpwd"
          controlId="validationCustom07"
        >
          <Form.Label className="d-flex">Confirm Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Confirm Password"
            required
            value={formValues.confirmPassword}
            onChange={(e) => handleInputChange(e)}
            name="confirmPassword"
            onBlur={validateInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid confirm password.
          </Form.Control.Feedback>
          {error.confirmPassword && <span style={{color: 'red'}}>{error.confirmPassword}</span>}
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
