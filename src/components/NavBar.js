import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
    useCurrentUser, useSetCurrentUser
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

import styles from '../styles/NavBar.module.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { FaCameraRetro } from "react-icons/fa";
import {
    FaArrowRightFromBracket, FaArrowRightToBracket, FaUserAstronaut
} from "react-icons/fa6";
import { ImEarth } from "react-icons/im";
import { MdOutlineHub } from "react-icons/md";
import { WiMoonAltWaxingCrescent3 } from "react-icons/wi";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedOutLinks = (
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

    const loggedInLinks = <>    
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.ActiveNavLink}
            to="/photos/upload"
        >
            <FaCameraRetro className={styles.NavLinkIcon} />Upload+
        </NavLink>
        <NavLink
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
        </NavLink>        
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
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className='px-1 border-2'
                    onClick={() => setExpanded(!expanded)}
                    ref={ref}
                />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.ActiveNavLink}
                            exact
                            to="/"
                        >
                            <ImEarth className={styles.NavLinkIcon} />Home
                        </NavLink>

                        {currentUser ? loggedInLinks : loggedOutLinks}
                    </Nav>
                </Navbar.Collapse >                
            </Container >            
        </Navbar >        
    );
}

export default NavBar