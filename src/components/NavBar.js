import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const NavBar = () => {
    return (
        <Navbar className="bg-body-tertiary" expand="md" ficed="top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>moonshot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Sign Up</Nav.Link>
                        <Nav.Link>Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar