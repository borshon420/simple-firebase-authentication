import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function App() {
  const [user, setUser] = useState([])
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser)
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
      const {displayName, photoURL} = result.user
      const loggedInUser = {
        name: displayName,
        photo: photoURL
      }
      setUser(loggedInUser)
    })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      console.log(result.user)
      const {displayName, photoURL} = result.user
      const loggedInUser = {
        name: displayName,
        photo: photoURL
      }
      setUser(loggedInUser)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }

  return (
    <div className="App">
      
  

      {!user.name ? <div className="btn-style">
      <h1>Sign In With</h1>
        <Button onClick={handleGoogleSignIn} variant="primary">Google Sign in</Button>
        <br />
        <Button onClick={handleGitHubSignIn} variant="secondary">GitHub Sign In</Button>
        <br />
        <Button onClick={handleFacebookSignIn} variant="success">Facebook Sign In</Button>
      
      </div> :
      <div>
        <h1>Sign Out With</h1>
        <Button style={{display: 'none'}} onClick={handleSignOut} variant="success">Sign Out</Button>
      </div>
      
      }
      {
        user.name && <div className="card-style">
          <Card>
              <Card.Img className="card-img" variant="top" src={user.photo} />
              <Card.Body>
              <Card.Title>Welcome: {user.name}</Card.Title>
              <Card.Title>I know your email address: {user.email}</Card.Title>
    
              <Button onClick={handleSignOut} variant="success">Sign Out</Button>
            </Card.Body>
          </Card>
          </div>
      }
    </div>
  );
}

export default App;
