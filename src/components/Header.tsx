import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/HeaderFooter.css";

export default function Header () {

    return (
        <>
            <Navbar className="bg-color" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/main">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/products">Products</Nav.Link>
                    <Nav.Link href="/main">Pricing</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}