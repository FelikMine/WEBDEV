import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/HeaderFooter.css";

export default function Footer () {

    return (
        <>
            <Navbar className="bg-color" data-bs-theme="dark">
                <Container style={{ height: '100px'}}>
                <Navbar.Brand href="/main" style={{ borderRight: '1px solid white', paddingRight: '20px'}}>Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link style={{ color: 'white', fontWeight: '600'}}> Contacts: </Nav.Link>
                    <Nav.Link href="mailto:nonscriverescript@gmail.com">Mail</Nav.Link>
                    <Nav.Link href="https://t.me/marunonotte">Telegram</Nav.Link>
                    <Nav.Link href="https://github.com/FelikMine/WEBDEV">GitHub</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}