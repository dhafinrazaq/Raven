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
      <div className="fixed-center bg-light rounded border w-50 text-center pl-3 pr-3 pt-4 pb-4">
        <img src="./Ravenlogo.svg" className="mb-3" />
        <div>
          <SigninForm></SigninForm>
          <SignUpModal></SignUpModal>
        </div>
      </div>
    );
  }
}

export default SignIn;
