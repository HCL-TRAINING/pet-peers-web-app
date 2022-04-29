import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/pet/home">PetPeers</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/pet/home">Home</Nav.Link>
                    <Nav.Link href="#features">About Us</Nav.Link>
                    <Nav.Link href="#features">Contact Us</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}