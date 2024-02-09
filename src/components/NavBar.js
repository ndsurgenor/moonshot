import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
    useCurrentUser, useSetCurrentUser
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

import styles from '../styles/NavBar.module.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { FaCameraRetro } from "react-icons/fa";
import {
    FaArrowRightFromBracket, FaArrowRightToBracket, FaUserAstronaut
} from "react-icons/fa6";
import { ImEarth } from "react-icons/im";
import { MdOutlineHub } from "react-icons/md";
import { WiMoonAltWaxingCrescent3 } from "react-icons/wi";
import Avatar from './Avatar';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();
    const addAvatar = (
        <Avatar
            src={currentUser?.profile_image}
        />
    )
    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const signedOutLinks = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.ActiveNavLink}
                to="/signup"
            >
                <MdOutlineHub className={styles.NavLinkIcon} />Sign Up
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.ActiveNavLink}
                to="/signin"
            >
                <FaArrowRightToBracket className={styles.NavLinkIcon} />Sign In
            </NavLink>
        </>
    );

    const signedInLinks = <>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.ActiveNavLink}
            to="/photos/upload"
        >
            <FaCameraRetro className={styles.NavLinkIcon} />Upload+
        </NavLink>
        <Navbar.Text className="ms-2">
            {currentUser && addAvatar}
        </Navbar.Text>
        <NavDropdown
            className={styles.NavDropdown}
            title={<span>{currentUser?.username}</span>}            
            align="end">
            <NavDropdown.Item
                className={`${styles.NavLink} mt-1}`}
                activeClassName={styles.ActiveNavLink}
            >
                <NavLink to={`/user-profiles/${currentUser?.profile_id}`}>
                    <FaUserAstronaut className={styles.NavLinkIcon} />Profile
                </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item className={`${styles.NavLink} mt-1}`}>
                <NavLink
                    to="/"
                    onClick={handleSignOut}
                >
                    <FaArrowRightFromBracket className={styles.NavLinkIcon} />Sign Out
                </NavLink>
            </NavDropdown.Item>
        </NavDropdown>
        {/* <NavLink
            className={styles.NavLink}
            activeClassName={styles.ActiveNavLink}
            to={`/user-profiles/${currentUser?.profile_id}`}
        >
            <FaUserAstronaut className={styles.NavLinkIcon} />Profile
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to="/"
            onClick={handleSignOut}
        >
            <FaArrowRightFromBracket className={styles.NavLinkIcon} />Sign Out
        </NavLink> */}
    </>;

    return (
        <Navbar
            className={styles.NavBar}
            expand="md"
            fixed="top"
            data-bs-theme="dark"
            expanded={expanded}
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand className={styles.NavBrand}>
                        moonshot <WiMoonAltWaxingCrescent3 className={styles.NavBrandIcon} />
                    </Navbar.Brand>
                </NavLink>
                <NavLink
                    className="d-md-none m-auto"
                    to={`/user-profiles/${currentUser?.profile_id}`}
                >
                    {currentUser && addAvatar}
                </NavLink>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className='px-1 border-2'
                    onClick={() => setExpanded(!expanded)}
                    ref={ref}
                />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {/* Home link */}
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.ActiveNavLink}
                            exact
                            to="/"
                        >
                            <ImEarth className={styles.NavLinkIcon} />Home
                        </NavLink>
                        {/* All other links */}
                        {currentUser ? signedInLinks : signedOutLinks}
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar