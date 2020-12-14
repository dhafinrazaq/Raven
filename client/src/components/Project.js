import React, { Component } from "react";
import { Button, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import {
  getProject,
  deleteProject,
  editProjectImage,
  updateProjectImageSrc,
} from "../actions/projectActions";
import { connect } from "react-redux";
import ProjectNavbar from "./ProjectNavbar";
import ProjectEditModal from "./ProjectEditModal";
import ProjectContributorSidebar from "./ProjectContributorSidebar";
import ProjectChangeImageModal from "./ProjectChangeImageModal";

export class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.id).then(() => {
      this.props.updateProjectImageSrc(this.getImgSource());
    });
  }

  getImgSource = () => {
    const { img } = this.props.project;

    if (!img) {
      return "";
    }

    var base64Flag = "data:image/jpeg;base64,";

    var imageStr = this.arrayBufferToBase64(img.data.data);
    return base64Flag + imageStr;
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
    window.location.href = "/";
  };

  render() {
    const { name, _id } = this.props.project;

    return (
      <div>
        <h1 class="text-center">{name}</h1>
        <Button
          className="remove-btn"
          color="danger"
          size="sm"
          onClick={() => this.onDeleteClick(_id)}
        >
          Delete this project
        </Button>
        <ProjectEditModal></ProjectEditModal>
        <ProjectChangeImageModal></ProjectChangeImageModal>
        <div class="row">
          <div class="col-sm-8">
            <img
              src={this.props.imageSrc}
              class="figure-img img-fluid mx-auto"
              alt="No image"
              style={{ maxHeight: "200px", maxWidth: "200px" }}
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
  editProjectImage: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  imageSrc: state.project.imageSrc,
});

export default connect(mapStateToProps, {
  getProject,
  deleteProject,
  editProjectImage,
  updateProjectImageSrc,
})(Project);
