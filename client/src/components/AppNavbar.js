import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut, fetchUserData } from "../actions/userActions";
import {
  Collapse,
  Label,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Form,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

export class AppNavbar extends Component {
  state = {
    isOpen: false,
    search: "",
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //Search Item using searchItem
    window.location.href = `/search/${this.state.search}`;
  };

  displayUsername = () => {
    const username = this.props.user.username;
    if (username) {
      return (
        <Link
          className="navbar-link"
          to={{
            pathname: "/account/" + username,
          }}
        >
          {username}
        </Link>
      );
    }

    return "";
  };

  resetState = () => {
    this.setState({
      isOpen: false,
      search: "",
    });
  };

  displayLogin = () => {
    if (this.props.isLoggedIn) {
      return (
        <Button
          color="danger"
          onClick={() => {
            this.props.signOut(this.resetState);
          }}
          className="ml-4"
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Button
          color="success"
          onClick={() => (window.location.href = "/account")}
          className="ml-4"
        >
          Login
        </Button>
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand>
              <Link className="navbar-link" to={{ pathname: "/" }}>
                <img
                  src="/RavenLogo.svg"
                  height="50"
                  alt="Raven Logo"
                  width="50"
                  className="mr-3"
                />
                Raven
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Form onSubmit={this.onSubmit}>
                    <Input
                      type="text"
                      name="search"
                      id="project"
                      placeholder="Search project"
                      onChange={this.onChange}
                    />
                  </Form>
                </NavItem>
                <NavItem>{this.displayLogin()}</NavItem>
                <NavItem>
                  <Label
                    style={{
                      color: "white",
                      wordWrap: "break-word",
                      width: "120px",
                    }}
                    className="ml-3 mt-2"
                  >
                    {this.displayUsername()}
                  </Label>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, { signOut, fetchUserData })(AppNavbar);
