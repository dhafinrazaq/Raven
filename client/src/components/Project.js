import React, { Component } from "react";
import PropTypes from "prop-types";
import { getProject, getProjects } from "../actions/projectActions";
import { connect } from "react-redux";
import ProjectNavbar from "./ProjectNavbar";

export class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.id);
  }

  render() {
    const { name } = this.props.project.project;

    return (
      <div>
        <h1 class="text-center">{name}</h1>
        <img
          src="https://via.placeholder.com/300.png/09f/fff"
          class="figure-img img-fluid mx-auto"
          alt="A generic square placeholder image with rounded corners in a figure."
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        ></img>
        <ProjectNavbar></ProjectNavbar>
      </div>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject, getProjects })(Project);
