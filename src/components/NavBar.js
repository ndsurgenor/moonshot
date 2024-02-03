import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';

import { ImEarth } from "react-icons/im";
import { MdOutlineHub } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top" data-bs-theme="dark">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand className={styles.NavBrand}>moonshot</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavLink className={styles.NavLink} activeClassName={styles.ActiveLink} exact to="/">
                            <ImEarth />Home
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.ActiveLink} to="/signup">
                            <MdOutlineHub />Sign Up
                        </NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.ActiveLink} to="/signin">
                            <FaArrowRightToBracket />Sign In
                        </NavLink>
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar