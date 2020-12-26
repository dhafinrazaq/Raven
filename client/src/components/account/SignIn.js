import React, { Component } from "react";
import SigninForm from "./SignInForm";
import SignUpModal from "./SignUpModal";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: "",
    };
  }
  render() {
    return (
      <div className="bg-light rounded w-75 m-auto border pt-4 pb-4 text-center">
        <img src="./Ravenlogo.svg" alt="Raven Logo" className="mb-3" />
        <div>
          <SigninForm></SigninForm>
          <SignUpModal></SignUpModal>
        </div>
      </div>
    );
  }
}

export default SignIn;
