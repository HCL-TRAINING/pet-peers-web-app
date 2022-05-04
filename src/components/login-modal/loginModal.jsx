import React, { useState } from "react";
import { useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Spinner,
  Alert
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import "./loginModal.css";

// @ts-ignore
export default function LoginModal({ show, onHide, onSuccess }) {
  const dispatch = useDispatch();
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.auth);
  // @ts-ignore
  const { message } = useSelector((state) => state.message);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    console.log("user form value", user);
    setLoading(true);
    // @ts-ignore
    dispatch(login({ email: user.email, password: user.password }))
      .unwrap()
      .then((res) => {
        console.log("apii res", res);
        // setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    e.preventDefault();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <Modal className="position-relative" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)} id="user-form">
            {/* <Form.Group className="mb-3" controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="username" autoFocus />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                autoFocus
                value={user.email}
                onChange={(e) => handleInputChange(e)}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pwd">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => handleInputChange(e)}
                name="password"
              />
            </Form.Group>
          </Form>

          <div className="text-sm-start">
            <span className="text-secondary">Not registered yet?</span>
            <Link to={"/signup"} className="text-decoration-none ms-2">
              Create an Account
            </Link>
          </div>

          {message && <Alert variant="danger" className="mt-2">{message}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            as="input"
            variant="primary"
            type="submit"
            form="user-form"
            value={"Login"}
          />
        </Modal.Footer>
        {loading && (
          <Spinner
            animation="border"
            className="loader position-absolute top-0 bottom-0 start-0 end-0 m-auto"
            variant="primary"
          />
        )}
      </Modal>
    </>
  );
}
