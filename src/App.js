import { Route, Switch } from 'react-router-dom';
import { ToastContainer, Slide, Zoom } from 'react-toastify';
import './api/axiosDefaults';

import { useCurrentUser } from './contexts/CurrentUserContext';
import { useDisplayedProfile } from './contexts/DisplayedProfileContext';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PhotoUploadForm from './pages/photos/PhotoUploadForm';
import PhotoEditForm from './pages/photos/PhotoEditForm';
import PhotoDetail from './pages/photos/PhotoDetail';
import PhotoFeed from './pages/photos/PhotoFeed';
import EquipmentEditForm from './pages/user/EquipmentEditForm';

import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const currentUser = useCurrentUser();
  const currentProfile = useDisplayedProfile();
  const user_id = currentUser?.profile_id || "";
  const profile_id = currentProfile?.profile_id || "";

  return (<>
    <div className={styles.App}>
      <NavBar />

      <Container className={styles.Main}>
        <Switch>
          {/* Standard Views */}
          <Route exact path="/" render={() => (
            <PhotoFeed
              header="all photos"
              message="Sorry, no results. Try adjusting your search." />
          )} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/photos/upload" render={() => <PhotoUploadForm />} />
          <Route exact path="/photos/:id/edit" render={() => <PhotoEditForm />} />
          <Route exact path="/photos/:id" render={() => <PhotoDetail />} />
          <Route exact path="/equipment-profiles/:id" render={() => <EquipmentEditForm />} />
          <Route exact path="/user-profiles/:id" render={() => (
            <PhotoFeed
              filter={`user__userprofile=${profile_id}&ordering=-created_at&`}
              message="No results"
            />
          )} />
          {/* Filtered Photo Views */}
          <Route exact path="/photos/filtered/user-uploads" render={() => (
            <PhotoFeed
              filter={`user__userprofile=${user_id}&ordering=-created_at&`}
              header="your photos"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/stars-given" render={() => (
            <PhotoFeed
              filter={`stars__user__userprofile=${user_id}&ordering=-stars__created_at&`}
              header="photos with your stars"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/comments-given" render={() => (
            <PhotoFeed
              filter={`comment__user__userprofile=${user_id}&ordering=-comment__created_at&`}
              header="photos with your comments"
              message="No results"
            />
          )} />
          {/* Error Views */}
          <Route render={() => <h1>404 Error - Page Not Found</h1>} />
        </Switch>
      </Container>

      <ToastContainer
        className={styles.Toast}
        position="bottom-center"
        transition={Slide}
        theme="dark"
        autoClose={3500}
        limit={3}
      />
    </div>
  </>
  );
}

export default App;