import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Login from "./components/Login";
import { GlobalStyle } from "./components/GlobalStyle";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import "firebase/firestore";
import { MdFormatIndentDecrease, MdSettingsInputAntenna } from "react-icons/md";
import Main from "./components/Main";

const firebaseConfig = {
  apiKey: "AIzaSyB98bpJrnsvF50eqVml99xIyC7TIumLQhY",
  authDomain: "pokemonapp-7777b.firebaseapp.com",
  projectId: "pokemonapp-7777b",
  storageBucket: "pokemonapp-7777b.appspot.com",
  messagingSenderId: "654984753002",
  appId: "1:654984753002:web:957d27273c12513e447f13",
  measurementId: "G-P3TWM7K8GN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firebaseui = require("firebaseui");
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

var provider = new firebase.auth.GoogleAuthProvider();

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [googleObj, setGoogleObj] = useState({});
  const [ready,setReady] = useState(false);
  const openLogin = () => {
    setShowLogin((prev) => !prev);
  };

  //If redirect, use sign in with redirect
  useEffect(() => {
    if (redirect) {
      console.log("Redirecting...");
      firebase.auth().signInWithRedirect(provider);
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log("Sucess!");
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode);
          // ...
        });
    }
  }, [redirect]);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      setGoogleObj(user);
    } else {
      //setGoogleObj({});
    }
    setReady(true);
  });

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
          window.location.reload();
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          {/*<Button onClick={openLogin}>Login</Button>*/}
          {console.log("googleObj: ")}
          {console.log(googleObj)}
          {ready ? (!Object.keys(googleObj).length ? (
            <Login
              showModal={showLogin}
              setShowModal={setShowLogin}
              redirect={redirect}
              setRedirect={setRedirect}
            />
          ) : <div>Hello {googleObj.displayName}</div>) : null}
          {/*<Button onClick={signOut}>Sign out</Button> */}
          <Main/>

          <GlobalStyle />
        </Container>
      </header>
    </div>
  );
}

export default App;
