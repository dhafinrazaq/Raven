import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { getProject, deleteProject } from "../actions/projectActions";
import { connect } from "react-redux";
import ProjectNavbar from "./ProjectNavbar";
import ProjectEditModal from "./ProjectEditModal";
import ProjectContributorSidebar from "./ProjectContributorSidebar";

export class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.id);
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
    window.location.href = "/";
  };

  render() {
    const { name, description } = this.props.project.project;

    return (
      <div>
        <h1 class="text-center">{name}</h1>
        <Button
          className="remove-btn"
          color="danger"
          size="sm"
          onClick={() => this.onDeleteClick(this.props.id)}
        >
          Delete this project
        </Button>
        <ProjectEditModal></ProjectEditModal>
        <div class="row">
          <div class="col-sm-8">
            <img
              src="https://via.placeholder.com/300.png/09f/fff"
              class="figure-img img-fluid mx-auto"
              alt="A generic square placeholder image with rounded corners in a figure."
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            ></img>
          </div>
          <div class="col-sm-4">
            <ProjectContributorSidebar></ProjectContributorSidebar>
          </div>
        </div>

        <ProjectNavbar></ProjectNavbar>
      </div>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject, deleteProject })(Project);
