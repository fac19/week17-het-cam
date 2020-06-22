import React from "react";
import Landing from "../pages/landingPage/Landing";

export default function requireAuthentication(
  ComponentSignedIn,
  ComponentSignedOut,
  user
) {
  function AuthHOC(props) {
    return user ? (
      <ComponentSignedIn user={user} {...props} />
    ) : (
      <ComponentSignedOut />
    );
  }
  return AuthHOC;
}
