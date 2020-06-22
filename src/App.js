import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landingPage/Landing";
import About from "./pages/aboutPage/About";
import SignUp from "./pages/signUpPage/SignUp";
import Login from "./pages/loginPage/Login";
import MyMissions from "./pages/myMissionsPage/MyMissions";
import MyProfile from "./pages/myProfilePage/MyProfile";
import Mission from "./pages/missionPage/Mission";
import AppContainer from "./App.style";
import netlifyIdentity from "netlify-identity-widget";
import authFunction from "../src/utils/auth";
import { loginUser, logoutUser } from "../src/utils/identityActions";
import { AppContextProvider } from "./utils/AppContext";
import { auth } from "./firebase";

const App = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUserInfo(user);
    } else {
      setUserInfo(null);
    }
  });

  return (
    <AppContextProvider>
      <AppContainer>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={authFunction(Landing, Landing, userInfo)}
            />
            <Route path="/about" component={() => <About />} />
            <Route
              path="/signup"
              component={authFunction(MyMissions, SignUp, userInfo)}
            />
            <Route
              path="/login"
              component={authFunction(MyMissions, Login, userInfo)}
            />
            <Route path="/logout" />

            <Route
              path="/my-profile"
              component={authFunction(MyProfile, Landing, userInfo)}
            />
            <Route
              path="/my-missions"
              component={authFunction(MyMissions, Landing, userInfo)}
            />
            <Route
              path="/mission/:number"
              component={authFunction(Mission, Landing, userInfo)}
            />
          </Switch>
        </Router>
      </AppContainer>
    </AppContextProvider>
  );
};
export default App;
