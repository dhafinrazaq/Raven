import logo from "./RavenLogo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ProjectModal from "./components/ProjectModal";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
