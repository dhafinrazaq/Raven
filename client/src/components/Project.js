import React, { Component } from "react";
import { Button } from "reactstrap";
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
    name: "",
    file: null,
    img: null,
  };

  async componentDidMount() {
    await this.props.getProject(this.props.id);

    const { img } = this.props.project;

    var base64Flag = "data:image/jpeg;base64,";
    if ("data" in img) {
      if ("data" in img.data) {
        console.log("img data");
        console.log(img.data);
        var imageStr = this.arrayBufferToBase64(img.data.data);
        this.setState({
          ...this.state,
          img: base64Flag + imageStr,
        });
      }
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    this.setState({ ...this.state, name: name });
  };

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
    window.location.href = "/";
  };

  // send = (e) => {
  //   const data = new FormData();
  //   data.append("name", this.state.name);
  //   data.append("file", this.state.file);

  //   Axios.post("/api/projects/upload", data)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  send = (e) => {
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("file", this.state.file);

    this.props.editProjectImage(data);
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  render() {
    const { name } = this.props.project.project;

    // console.log(img);
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
        <form action="#">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => {
                const name = e.target.value;
                this.setState({ ...this.state, name: name });
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="file">Image</label>
            <input
              type="file"
              id="file"
              accept=".jpg"
              onChange={(event) => {
                const file = event.target.files[0];
                this.setState({ ...this.state, file: file });
              }}
            ></input>
          </div>
          <button onClick={this.send}>Submit</button>
        </form>
        <div class="row">
          <div class="col-sm-8">
            <img
              src={this.state.img}
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
  editProjectImage: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, {
  getProject,
  deleteProject,
  editProjectImage,
})(Project);
