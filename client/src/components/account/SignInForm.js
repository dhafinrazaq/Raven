import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions/userActions";
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
} from "reactstrap";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: "",
      isHiddenPassword: true,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetState = () => {
    this.setState({
      uid: "",
      password: "",
      isHiddenPassword: true,
      errors: {},
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      uid: this.state.uid,
      password: this.state.password,
    };

    this.props.signIn(userCredentials, this.resetState, this.setError);
  };

  setError = (errors) => {
    this.setState({ errors });
  };

  uidInputBox = () => {
    const isError = this.state.errors.uid;
    if (isError) {
      return (
        <FormGroup>
          <Input
            invalid
            type="text"
            value={this.state.uid}
            placeholder="Email address or username"
            autoComplete="off"
            id="uid-error"
            name="uid"
            onChange={this.onChange}
          />
          <FormFeedback>{this.state.errors.uid}</FormFeedback>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup>
          <Input
            type="text"
            value={this.state.uid}
            placeholder="Email address or username"
            autoComplete="off"
            id="uid"
            name="uid"
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

  setError = (errors) => {
    this.setState({ errors });
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
        <Form onSubmit={this.onSubmit}>
          {this.uidInputBox()}
          {this.passwordInputBox()}
          <Button color="primary">Log In</Button>
        </Form>
        <Row>
          <a href="">Forgotten Password?</a>
        </Row>
      </React.Fragment>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {
  signIn,
})(SignInForm);
