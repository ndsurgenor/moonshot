import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { getMoreData } from '../../utils/Utils';

import Avatar from '../../components/Avatar';
import Filters from '../../components/Filters';
import PhotoCard from '../../components/PhotoCard';
import Asset from '../../components/Asset';
import NoResults from '../../assets/no-results.png';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from '../../styles/PhotoFeed.module.css';
import appStyles from '../../App.module.css';

import { FiSearch } from 'react-icons/fi';
import { GoRocket } from 'react-icons/go';


function PhotoFeed(props) {
  const {
    filter = "",
    header,
    message,
    user_profile,
  } = props
  const [photos, setPhotos] = useState({ results: [] });
  const [gear, setGear] = useState({});
  const [profile, setProfile] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const { data } = await axiosReq.get(
          user_profile ? (
            `/photos/?user__userprofile=${id}&ordering=-created_at&search=${query}`
          ) : (
            `/photos/?${filter}search=${query}`
          )
        )
        setPhotos(data)
        setDataLoaded(true)
      } catch (err) {
        // console.log(err)
      }
    }
    setDataLoaded(false)
    const photoFeedDelay = setTimeout(() => {
      getPhotos()
    }, 1000)
    return () => {
      clearTimeout(photoFeedDelay)
    }
  }, [filter, pathname, query, currentUser, id, user_profile])

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profile }, { data: gear }] =
          await Promise.all([
            axiosReq.get(`/user-profiles/${id}/`),
            axiosReq.get(`/equipment-profiles/${id}/`)
          ])
        setProfile(profile);
        setGear(gear);
      } catch (err) {
        // console.log(err)
      }
    }
    handleMount()
  }, [id])

  return (
    <>
      {/* Page Headers*/}
      <Row>
        {id ? (
          // User Profile          
          <Container className="d-md-flex text-center text-md-start my-3">
            <Col xs={12} md={1} lg={2} className="text-center text-md-end me-3">
              <Avatar src={profile.avatar} height={75} />
            </Col>
            <Col xs={12} md={5} lg={5} className="ms-sm-0 ms-md-3 ms-lg-0">
              <h3>Profile for {profile.user}</h3>
              <p className="mb-0">Name: {profile.name}</p>
              <p className="mb-0">Details: {profile.details}</p>
              <p className="mb-0">Photos added: {profile.photo_upload_count}</p>
              {currentUser?.profile_id === profile.id &&
                <Link className={styles.FeedLink} to={`/user-profiles/edit/${id}`}>
                  Edit profile details
                </Link>}
            </Col>
            <Col xs={12} md={6} lg={5}>
              <h4 className="mt-0 mt-md-1">Main Gear</h4>
              <p className="mb-0">Scope/Lens: {gear.main_lens}</p>
              <p className="mb-0">Camera: {gear.main_camera}</p>
              <p className="mb-0">Other Equipment: {gear.other_equipment}</p>
              {currentUser?.profile_id === profile.id &&
                <Link className={styles.FeedLink} to={`/equipment-profiles/${id}`}>
                  Edit equipment details
                </Link>}
            </Col>
          </Container>
        ) : currentUser ? (
          // Signed In Home Page
          <Container
            className="d-md-flex text-center text-md-start mt-md-3 mb-3"
          >
            <Col xs={12} md={8}>
              <h1 className={styles.FeedHeader}>
                viewing {header}
              </h1>
            </Col>
            <Col xs={12} md={4} >
              <Filters className="me-md-2" />
            </Col>
          </Container>
        ) : (
          // Signed Out Home Page
          <Col xs={12}>
            <h1 className="text-center mt-md-3 mb-0">
              <span className={appStyles.Brand}>
                Welcome to moonshot
              </span>
            </h1>
            <h4 className="text-center mb-3">
              Your space to snap & share space
              <GoRocket className="ms-2" />
            </h4>
            <p className="text-center">
              Please<Link className={styles.FeedLink} to="/signup">sign up</Link>
              or<Link className={styles.FeedLink} to="/signin">sign in</Link>
              to get the most out of your visit
            </p>
          </Col>
        )}
      </Row>

      {/* Search Bar */}
      <Row>
        <Col>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex">
              <FiSearch className={styles.FeedSearchIcon} />
              <Form.Control
                type="text"
                placeholder="Search photos by title, owner, feature, etc."
                className="mb-3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}>

              </Form.Control>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Photo Gallery */}
      <Row>
        {dataLoaded ? (
          <>
            {photos.results.length ? (
              <InfiniteScroll
                dataLength={photos.results.length}
                loader={<Asset spinner />}
                hasMore={!!photos.next}
                next={() => getMoreData(photos, setPhotos)}
              >
                <ResponsiveMasonry
                  className={styles.FeedGallery}
                  columnsCountBreakPoints={{ 0: 1, 767: 2, 1200: 3 }}
                >
                  <Masonry>
                    {photos.results.map(photo => (
                      <PhotoCard
                        key={photo.id}
                        {...photo}
                        setPhotos={setPhotos}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </InfiniteScroll>
            ) : (
              <Container>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset message='Loading images...' spinner />
          </Container>
        )}
      </Row>

    </>
  );
}

export default PhotoFeed;