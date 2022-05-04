// @ts-nocheck
import React from "react";
import { useCallback } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slices/auth";

export default function Header() {
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("userr", currentUser);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href={currentUser ? "/pet/dashboard" : "/pet/home"}>
          PetPeers
        </Navbar.Brand>
        <Nav className="me-auto" activeKey={"/home"}>
          {currentUser ? (
              <>
            <Nav.Link href="/pet/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/pet/my-pets">My Pets</Nav.Link>
            <Nav.Link href="/pet/add-pets">Add Pet</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/pet/home">Home</Nav.Link>
              <Nav.Link href="#features">About Us</Nav.Link>
              <Nav.Link href="#features">Contact Us</Nav.Link>
            </>
          )}
        </Nav>

        <Nav>
          {currentUser ? (
            <>
              <Nav.Link href="/pet/dashboard">{currentUser.username}</Nav.Link>
              <Nav.Link href="/pet/login" onClick={() => logOut()}>
                LogOut
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/pet/login">Login</Nav.Link>
              <Nav.Link href="/pet/signup">SignUp</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
