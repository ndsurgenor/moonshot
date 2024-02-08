import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import UploadForm from './pages/photos/Upload';

import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';


function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/photos/upload" render={() => <UploadForm />} />
              <Route render={() => <h1>404 Error - Page Not Found</h1>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;