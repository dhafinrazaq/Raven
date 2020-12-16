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
  Row,
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
          show
        </Button>
      );
    } else {
      return (
        <Button color="secondary" onClick={this.togglePasswordVisibility}>
          hide
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
          <Button color="success" onClick={this.toggle}>
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
                  <Button color="success" className="btn btn-primary btn-block">Sign Up</Button>
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
