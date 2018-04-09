import React, { Component } from "react";
import { app, googleAuthProvider } from "../../../firebase";

class SignIn extends Component {
  handleClick() {
    app
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        var user = result.user;
        if (user) {
          // Save user.
        }
      })
      .catch(e => {});
  }

  render() {
    return (
      <div className="signin">
        <button className="button" onClick={this.handleClick}>
          Sign In
        </button>
      </div>
    );
  }
}

export default SignIn;
