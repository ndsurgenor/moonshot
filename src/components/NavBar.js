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
                <MdOutlineHub className={styles.NavLinkIcon} />
                Sign Up
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.ActiveNavLink}
                to="/signin"
            >
                <FaArrowRightToBracket className={styles.NavLinkIcon} />
                Sign In
            </NavLink>
        </>
    );

    // const dropdownMenuLinks = (
    //     <>
    //         <Navbar.Text className="d-none d-md-flex ms-2">
    //             {currentUser && addAvatar}
    //         </Navbar.Text>
    //         <NavDropdown
    //             className={`${styles.NavDropdown} d-none d-md-flex`}
    //             title={<span>{currentUser?.username}</span>}
    //             align="end">
    //             <NavDropdown.ItemText >
    //                 <NavLink
    //                     className={styles.NavLink}
    //                     activeClassName={styles.ActiveNavLink}
    //                     to={`/user-profiles/${currentUser?.profile_id}`}
    //                 >
    //                     <FaUserAstronaut className={styles.NavLinkIcon} />
    //                     Profile
    //                 </NavLink>
    //             </NavDropdown.ItemText>
    //             <NavDropdown.ItemText>
    //                 <NavLink
    //                     className={styles.NavLink}
    //                     to="/"
    //                     onClick={handleSignOut}
    //                 >
    //                     <FaArrowRightFromBracket className={styles.NavLinkIcon} />
    //                     Sign Out
    //                 </NavLink>
    //             </NavDropdown.ItemText>
    //         </NavDropdown>
    //     </>
    // );

    // const toggleMenuLinks = (
    //     <>
    //         <NavLink
    //             className={`${styles.NavLink} d-md-none`}
    //             activeClassName={styles.ActiveNavLink}
    //             to={`/user-profiles/${currentUser?.profile_id}`}
    //         >
    //             <FaUserAstronaut className={styles.NavLinkIcon} />
    //             Profile: {currentUser?.username}
    //         </NavLink>
    //         <NavLink
    //             className={`${styles.NavLink} d-md-none`}
    //             to="/"
    //             onClick={handleSignOut}
    //         >
    //             <FaArrowRightFromBracket className={styles.NavLinkIcon} />
    //             Sign Out
    //         </NavLink>
    //     </>
    // );

    const signedInLinks = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.ActiveNavLink}
                to="/photos/upload"
            >
                <FaCameraRetro className={styles.NavLinkIcon} />
                Upload+
            </NavLink>
            <NavLink
                className={`${styles.NavLink} d-md-none`}
                activeClassName={styles.ActiveNavLink}
                to={`/user-profiles/${currentUser?.profile_id}`}
            >
                <FaUserAstronaut className={styles.NavLinkIcon} />
                Profile: {currentUser?.username}
            </NavLink>
            <NavLink
                className={`${styles.NavLink} d-md-none`}
                to="/"
                onClick={handleSignOut}
            >
                <FaArrowRightFromBracket className={styles.NavLinkIcon} />
                Sign Out
            </NavLink>
            <Navbar.Text className="d-none d-md-flex ms-2">
                {currentUser && addAvatar}
            </Navbar.Text>
            <NavDropdown
                className={`${styles.NavDropdown} d-none d-md-flex`}
                title={<span>{currentUser?.username}</span>}
                align="end">
                <NavDropdown.ItemText >
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.ActiveNavLink}
                        to={`/user-profiles/${currentUser?.profile_id}`}
                    >
                        <FaUserAstronaut className={styles.NavLinkIcon} />
                        Profile
                    </NavLink>
                </NavDropdown.ItemText>
                <NavDropdown.ItemText>
                    <NavLink
                        className={styles.NavLink}
                        to="/"
                        onClick={handleSignOut}
                    >
                        <FaArrowRightFromBracket className={styles.NavLinkIcon} />
                        Sign Out
                    </NavLink>
                </NavDropdown.ItemText>
            </NavDropdown>
            {/* {var ? dropdownMenuLinks : toggleMenuLinks} */}
        </>
    );

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
                <Navbar.Text>
                    <span className="d-md-none">{currentUser && addAvatar}</span>
                </Navbar.Text>
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
                            <ImEarth className={styles.NavLinkIcon} />
                            Home
                        </NavLink>
                        {currentUser ? signedInLinks : signedOutLinks}
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar