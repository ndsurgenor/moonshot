import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { getMoreData } from '../utils/Utils';

import PhotoCard from './PhotoCard';
import Asset from './Asset';
import NoResults from '../assets/no-results.png';

import { Container } from 'react-bootstrap';
import styles from '../styles/PhotoFeed.module.css'


function PhotoFeed({ message, filter = "" }) {
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
                className={styles.PhotoGallery}
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
            <Asset spinner />
          </Container>
        )}
    </>
  );
}

export default PhotoFeed;