import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landingPage/Landing";
import About from "./pages/aboutPage/About";
import SignUp from "./pages/signUpPage/SignUp";
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
  const [userInfo, setUserInfo] = React.useState({});

  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log("HEllO", user.uid);
      // history.push("/my-missions");
    }
  });

  // React.useEffect(() => {
  //   const user = netlifyIdentity.currentUser();
  //   if (user) {
  //     setUserInfo({ user: user });
  //   } else {
  //     loginUser();
  //   }
  //   netlifyIdentity.on("login", (user) => setUserInfo({ user }, loginUser()));
  //   netlifyIdentity.on("logout", (user) =>
  //     setUserInfo({ user: null }, logoutUser()),
  //   );
  // }, []);

  return (
    <AppContextProvider>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Landing />} />
            <Route path="/about" component={() => <About />} />
            <Route path="/signup" component={() => <SignUp />} />
            <Route path="/logout" />

            <Route
              path="/my-profile"
              component={authFunction(MyProfile, netlifyIdentity.currentUser())}
            />
            <Route
              path="/my-missions"
              component={authFunction(
                MyMissions,
                netlifyIdentity.currentUser()
              )}
            />
            <Route
              path="/mission/:number"
              component={authFunction(Mission, netlifyIdentity.currentUser())}
            />
          </Switch>
        </Router>
      </AppContainer>
    </AppContextProvider>
  );
};
export default App;
