import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <h1>Home</h1>
        <h1>Sign In</h1>
      </Container>
    </div>
  );
}

export default App;