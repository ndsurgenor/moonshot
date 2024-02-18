import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

import { useCurrentUser } from './contexts/CurrentUserContext';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PhotoUploadForm from './pages/photos/PhotoUploadForm';
import PhotoEditForm from './pages/photos/PhotoEditForm';
import PhotoDisplayPage from './pages/photos/PhotoDisplayPage';
import PhotoFeed from './pages/photos/PhotoFeed';

import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  console.log(currentUser?.profile_id)

  return (<>
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>

          {/* Standard Views */}
          <Route exact path="/" render={() => (
            <PhotoFeed header="Latest Photos" message="No results" />
          )} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/photos/upload" render={() => <PhotoUploadForm />} />
          <Route exact path="/photos/:id/edit" render={() => <PhotoEditForm />} />
          <Route exact path="/photos/:id" render={() => <PhotoDisplayPage />} />
          <Route exact path="/user-profiles/:id" render={() => (<PhotoFeed message="No results" />)} />

          {/* Filtered Photo Views */}
          <Route exact path="/photos/filtered/user-uploads" render={() => (
            <PhotoFeed
              filter={`user__userprofile=${profile_id}&ordering=-created_at&`}
              header="Your Photos"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/stars-given" render={() => (
            <PhotoFeed
              filter={`stars__user__userprofile=${profile_id}&ordering=-stars__created_at&`}
              header="Your Stars"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/comments-given" render={() => (
            <PhotoFeed
              filter={`comments__user__userprofile=${profile_id}&ordering=-comments__updated_at&`}
              header="Your Comments"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/stars-received" render={() => (
            <PhotoFeed
              filter={`stars&user__userprofile=${profile_id}&ordering=-stars__created_at&`}
              header="Stars Received"
              message="No results"
            />
          )} />
          <Route exact path="/photos/filtered/comments-received" render={() => (
            <PhotoFeed
              filter={`comments&user__userprofile=${profile_id}&ordering=-comments__updated_at&`}
              header="Comments Received"
              message="No results"
            />
          )} />          

          {/* Error Views */}
          <Route render={() => <h1>404 Error - Page Not Found</h1>} />

        </Switch>
      </Container>
    </div>
  </>
  );
}

export default App;