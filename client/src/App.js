import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import SearchProjectList from "./components/SearchProjectList";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ProjectModal from "./components/ProjectModal";
import JoinApplicationList from "./components/Project Detail/JoinApplicationList";
import JoinApplication from "./components/Project Detail/JoinApplication";
import UserProfile from "./components/account/UserProfile";
import SignIn from "./components/account/SignIn";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import { fetchUserData } from "./actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchUserData();
    setInterval(() => {
      this.props.fetchUserData();
    }, 1800000); // check for expired jwt in cookie
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <Container>
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <ProjectModal></ProjectModal>
                  <ProjectList />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/projects/:id"
              render={(props) => (
                <React.Fragment>
                  <Project id={props.match.params.id}></Project>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/projects/:id/join"
              render={(props) => (
                <React.Fragment>
                  <JoinApplicationList
                    id={props.match.params.id}
                  ></JoinApplicationList>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/projects/:id/join/:joinId"
              render={(props) => (
                <React.Fragment>
                  <JoinApplication
                    id={props.match.params.id}
                    joinId={props.match.params.joinId}
                  ></JoinApplication>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/search/:query"
              render={(props) => (
                <React.Fragment>
                  <ProjectModal></ProjectModal>
                  <SearchProjectList query={props.match.params.query} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/account"
              render={(props) => (
                <React.Fragment>
                  <SignIn></SignIn>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/account/:username"
              render={(props) => (
                <React.Fragment>
                  <UserProfile query={props.match.params.username} />
                </React.Fragment>
              )}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {
  fetchUserData,
})(App);
