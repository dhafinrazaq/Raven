import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../actions/userActions";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHiddenPassword: true,
      modal: false,
      username: "",
      password: "",
      email: "",
      errors: {},
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  resetState = () => {
    this.setState({
      isHiddenPassword: true,
      modal: false,
      username: "",
      password: "",
      email: "",
      errors: {},
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setError = (errors) => {
    this.setState({ errors });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

    this.props.signUp(newUser, this.resetState, this.setError);
  };

  usernameInputBox = () => {
    const isError = this.state.errors.username;
    if (isError) {
      return (
        <FormGroup>
          <Input
            invalid
            type="text"
            value={this.state.username}
            placeholder="Username"
            autoComplete="off"
            id="username-error"
            name="username"
            onChange={this.onChange}
          />
          <FormFeedback>{this.state.errors.username}</FormFeedback>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup>
          <Input
            type="text"
            value={this.state.username}
            placeholder="Username"
            autoComplete="off"
            id="username"
            name="username"
            onChange={this.onChange}
          ></Input>
        </FormGroup>
      );
    }
  };

  emailInputBox = () => {
    const isError = this.state.errors.email;
    if (isError) {
      return (
        <FormGroup>
          <Input
            invalid
            type="email"
            value={this.state.email}
            placeholder="Email"
            autoComplete="off"
            id="email-error"
            name="email"
            onChange={this.onChange}
          />
          <FormFeedback>{this.state.errors.email}</FormFeedback>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup>
          <Input
            type="email"
            value={this.state.email}
            placeholder="Email"
            autoComplete="off"
            id="email"
            name="email"
            onChange={this.onChange}
          ></Input>
        </FormGroup>
      );
    }
  };

  passwordType = () => {
    if (this.state.isHiddenPassword) {
      return "password";
    }

    return "text";
  };

  togglePasswordVisibility = (e) => {
    e.preventDefault();

    this.setState({ isHiddenPassword: !this.state.isHiddenPassword });
  };

  togglePasswordButton = () => {
    if (this.state.isHiddenPassword) {
      return (
        <Button color="secondary" onClick={this.togglePasswordVisibility}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
            />
            <path
              fill-rule="evenodd"
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
            />
          </svg>
        </Button>
      );
    } else {
      return (
        <Button color="secondary" onClick={this.togglePasswordVisibility}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye-slash"
            viewBox="0 0 16 16"
          >
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" />
            <path
              fill-rule="evenodd"
              d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
            />
          </svg>
        </Button>
      );
    }
  };

  passwordInputBox = () => {
    const isError = this.state.errors.password;
    if (isError) {
      return (
        <FormGroup>
          <InputGroup>
            <Input
              invalid
              type={this.passwordType()}
              value={this.state.password}
              placeholder="Password"
              autoComplete="off"
              id="password-error"
              name="password"
              onChange={this.onChange}
            ></Input>
            <InputGroupAddon addonType="append">
              {this.togglePasswordButton()}
            </InputGroupAddon>
            <FormFeedback>{this.state.errors.password}</FormFeedback>
          </InputGroup>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup>
          <InputGroup>
            <Input
              type={this.passwordType()}
              value={this.state.password}
              placeholder="Password"
              autoComplete="off"
              id="password"
              name="password"
              onChange={this.onChange}
            ></Input>
            <InputGroupAddon addonType="append">
              {this.togglePasswordButton()}
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Button color="success" className="mt-2" onClick={this.toggle}>
            Create New Account
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="modal-dialog modal-dialog-centered"
          >
            <ModalHeader toggle={this.toggle}>
              <p className="mb-0">
                <h2>Sign Up</h2>
              </p>
              <span>
                <small>It's quick and easy.</small>
              </span>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                <FormGroup>
                  {this.usernameInputBox()}
                  {this.emailInputBox()}
                  {this.passwordInputBox()}
                </FormGroup>
                <p>
                  <small>
                    By clicking on Sign Up, you agree to our Terms, Data Policy
                    and Cookie Policy. You may receive email notifications from
                    us and can opt out any time.{" "}
                  </small>
                </p>
                <div className="text-center">
                  <Button color="success" className="btn btn-primary btn-block">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

SignUpModal.propTypes = {
  signUp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {
  signUp,
})(SignUpModal);
