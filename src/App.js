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
          <Route exact path="/" render={() => (<PhotoFeed message="No results" />)} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/photos/upload" render={() => <PhotoUploadForm />} />
          <Route exact path="/photos/:id/edit" render={() => <PhotoEditForm />} />
          <Route exact path="/photos/:id" render={() => <PhotoDisplayPage />} />
          <Route exact path="/user-profiles/:id" render={() => (<PhotoFeed message="No results" />)} />
          <Route exact path="/starred" render={() => (
            <PhotoFeed
              message="No results"
              filter={`stars__user__userprofile=${profile_id}&ordering=-stars__created_at&`}
            />
          )} />
          <Route exact path="/user-profiles/commented" render={() => (
            <PhotoFeed
              message="No results"
              filter={`comments__user__userprofile=${profile_id}&ordering=-comments__created_at&`}
            />
          )} />
          <Route render={() => <h1>404 Error - Page Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  </>
  );
}

export default App;