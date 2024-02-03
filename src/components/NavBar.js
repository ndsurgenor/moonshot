import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// NavBar Icons
import { ImEarth } from "react-icons/im";
import { MdOutlineHub } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";


const NavBar = () => {
    return (
        <Navbar className="bg-body-tertiary" expand="md" ficed="top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>moonshot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link><ImEarth /> Home</Nav.Link>
                        <Nav.Link><MdOutlineHub /> Sign Up</Nav.Link>
                        <Nav.Link><FaArrowRightToBracket /> Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar