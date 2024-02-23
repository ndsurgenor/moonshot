import React from 'react';

import NoResults from '../assets/no-results.png';
import Asset from '../components/Asset';

import Container from 'react-bootstrap/Container';


const NotFound = () => {
    return (
        <Container className="d-block text-center mt-3">
            <h2 className="my-3">
                404 - Page Not Found
            </h2>
            <h5 className="my-3">
                Nothing here but the endless void of space...
            </h5>
            <Asset src={NoResults} />
            <p className="w-50 m-auto mt-3">
                The page you are looking for doesn't exist
                or has been moved to another location.
                Please select a link above to navigate back to the site.
            </p>
        </Container>
    )
}

export default NotFound;