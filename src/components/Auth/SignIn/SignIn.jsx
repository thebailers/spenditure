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
          console.log("worked");
          console.log("====================================");
          console.log(user.uid);
          console.log("====================================");
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
