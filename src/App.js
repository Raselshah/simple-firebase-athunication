import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const { displayName, email, photoURL } = user;

  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  const handleSignInGit = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div className="home-page">
        {displayName ? (
          <div className="user-info">
            <h2>Name : {displayName}</h2>
            <p>Email : {email ? email : "No email founded"}</p>
            <img className="photo" src={photoURL} alt="" />
          </div>
        ) : (
          <h2>Please Sign In with another option</h2>
        )}

        {displayName ? (
          <button className="red-btn-design" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <button className="green-btn-design" onClick={handleSignIn}>
              Sign In Google
            </button>
            <button className="green-btn-design" onClick={handleSignInGit}>
              Sign In GitHub
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
