import React from 'react'
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import styles from '../styles/Filters.module.css'

import { CgComment } from 'react-icons/cg';
import { FaCameraRetro, FaStar } from 'react-icons/fa';
import { FaPhotoFilm } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import { TbStarsFilled } from "react-icons/tb";


const Filters = () => {
    return (
        <Container>
            <h4>Filters</h4>
            <Link to="/">
                <span className={styles.FilterButton}>
                    <FaPhotoFilm
                        className={styles.FilterIcon}
                        aria-label="view all photos"
                    />
                </span>
            </Link>
            <Link to="/photos/filtered/user-uploads">
                <span className={styles.FilterButton}>
                    <FaCameraRetro
                        className={styles.FilterIcon}
                        aria-label="view photos you have uploaded"
                    />
                </span>
            </Link>
            <Link to="/photos/filtered/stars-received">
                <span className={styles.FilterButton}>
                    <TbStarsFilled
                        className={styles.FilterIcon}
                        aria-label=" view your photos with stars"
                    />
                </span>
            </Link>
            <Link to="/photos/filtered/comments-received">
                <span className={styles.FilterButton}>
                    <LiaComments
                        className={styles.FilterIcon}
                        aria-label="view your photos with comments"
                    />
                </span>
            </Link>
            <Link to="/photos/filtered/stars-given">
                <span className={styles.FilterButton}>
                    <FaStar
                        className={styles.FilterIcon}
                        aria-label="view photos you have starred"
                    />
                </span>
            </Link>
            <Link to="/photos/filtered/comments-given">
                <span className={styles.FilterButton}>
                    <CgComment
                        className={styles.FilterIcon}
                        aria-label="view photos you have commented on"
                    />
                </span>
            </Link>
        </Container>
    )
}

export default Filters;