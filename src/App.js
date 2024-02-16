import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import UploadForm from './pages/photos/UploadForm';
import EditForm from './pages/photos/EditForm';
import PhotoPage from './pages/photos/PhotoPage';
import PhotoFeed from './pages/photos/PhotoFeed';

import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
// import { useCurrentUser } from './contexts/CurrentUserContext';


function App() {
  // const currentUser = useCurrentUser();
  // const profile_id = currentUser?.profile_id || "";

  return (<>
    <div className={styles.App}>      
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PhotoFeed
                message="Nothing here but the empty void of space... Try searching for something else"
              />
            )}
          />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/photos/upload" render={() => <UploadForm />} />
          <Route exact path="/photos/:id/edit" render={() => <EditForm />} />
          <Route exact path="/photos/:id" render={() => <PhotoPage />} />
          <Route render={() => <h1>404 Error - Page Not Found</h1>} />
        </Switch>
      </Container>
    </div>
    </>
  );
}

export default App;