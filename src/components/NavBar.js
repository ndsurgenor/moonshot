import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';

// import { WiMoonAltWaxingCrescent3 } from "react-icons/wi";
// import { ImEarth } from "react-icons/im";
// import { MdOutlineHub } from "react-icons/md";
// import { FaArrowRightToBracket } from "react-icons/fa6";


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top" data-bs-theme="dark">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand className={styles.NavBrand}>
                        {/* moonshot <WiMoonAltWaxingCrescent3 className={styles.NavBrandIcon} /> */}
                        moonshot
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.ActiveNavLink}
                            exact
                            to="/"
                        >
                            {/* <ImEarth className={styles.NavLinkIcon} />Home */}
                            Home
                        </NavLink>
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.ActiveNavLink}
                            to="/signup"
                        >
                            {/* <MdOutlineHub className={styles.NavLinkIcon} />Sign Up */}
                            Sign Up
                        </NavLink>
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.ActiveNavLink}
                            to="/signin"
                        >
                            {/* <FaArrowRightToBracket className={styles.NavLinkIcon} />Sign In */}
                            Sign In
                        </NavLink>
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar