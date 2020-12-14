import React, { Component } from "react";
import { Button, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import {
  getProject,
  deleteProject,
  editProjectImage,
} from "../actions/projectActions";
import { connect } from "react-redux";
import ProjectNavbar from "./ProjectNavbar";
import ProjectEditModal from "./ProjectEditModal";
import ProjectContributorSidebar from "./ProjectContributorSidebar";

export class Project extends Component {
  state = {
    file: null,
    img: "",
  };

  componentDidMount() {
    this.props.getProject(this.props.id).then(() => {
      this.setImgSource();
    });
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
    window.location.href = "/";
  };

  setImgSource = () => {
    const { img } = this.props.project;

    if (!img) {
      return;
    }

    var base64Flag = "data:image/jpeg;base64,";

    var imageStr = this.arrayBufferToBase64(img.data.data);
    this.setState({
      ...this.state,
      img: base64Flag + imageStr,
    });
  };

  send = (e) => {
    const data = new FormData();
    data.append("id", this.props.project._id);
    data.append("file", this.state.file);

    this.props.editProjectImage(data).then(() => {
      this.setImgSource();
    });
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
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
        <form action="#">
          <FormGroup>
            <label htmlFor="file">Image</label>
            <input
              className="form-control-file"
              type="file"
              id="file"
              accept=".jpg"
              onChange={(event) => {
                const file = event.target.files[0];
                this.setState({ ...this.state, file: file });
              }}
            ></input>
          </FormGroup>
          <button className="btn btn-primary" onClick={this.send}>
            Submit
          </button>
        </form>
        <div class="row">
          <div class="col-sm-8">
            <img
              src={this.state.img}
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
});

export default connect(mapStateToProps, {
  getProject,
  deleteProject,
  editProjectImage,
})(Project);
