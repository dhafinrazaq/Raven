import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Collapse,
  Label,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Form,
  Input,
} from "reactstrap";

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
    const username = this.props.user.username
    if (username) {
      return `Hello, ${username}`;
    }

    return "";
  }

  displayLogin = () => {
    const isLoggedIn = Object.entries(this.props.user).length > 0;
    if (isLoggedIn) {
      return "Logout";
    }

    return "Login";
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <img src="./RavenLogo.svg" className="mr-3" />
            <NavbarBrand href="/">Raven</NavbarBrand>
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
                <NavItem>
                  <Button
                    color="success"
                    onClick={() => (window.location.href = "/account")}
                    className="ml-4"
                  >
                    {this.displayLogin()}
                  </Button>
                </NavItem>
                <NavItem>
                  <Label>{this.displayUsername()}</Label>
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
});

export default connect(mapStateToProps)(AppNavbar);
