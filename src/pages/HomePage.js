import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

import PhotoFeed from '../components/PhotoFeed'

import { Col, Row, Form } from 'react-bootstrap';

import { FiSearch } from "react-icons/fi";


function HomePage({ message, filter = "" }) {
    const [photos, setPhotos] = useState({ results: [] });
    const [dataLoaded, setDataLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/photos/?${filter}search=${query}`
                )
                setPhotos(data)
                setDataLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setDataLoaded(false)
        const photoFeedDelay = setTimeout(() => {
            getPhotos()
        }, 1000)
        return () => {
            clearTimeout(photoFeedDelay)
        }
    }, [filter, pathname, query])

    return (
        <>
            <Row>
                <Col>
                    <h1>Latest Photos</h1>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FiSearch />
                        <Form.Control
                            type="text"
                            placeholder="Search photos by title, owner, feature, etc."
                            className="mb-3"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}>
                        </Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PhotoFeed />
                </Col>
            </Row>
        </>
    );
}

export default HomePage;