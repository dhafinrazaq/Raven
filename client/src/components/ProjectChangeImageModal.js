import React, { Component } from "react";
import { Form, Modal, ModalHeader, ModalBody, FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  getProject,
  editProject,
  editProjectImage,
  updateProjectImageSrc,
  clearProjectError,
} from "../actions/projectActions";

export class ProjectChangeImageModal extends Component {
  state = {
    modal: false,
    file: null,
  };

  componentDidMount() {
    this.props.getProject(this.props.id).then(() => {
      this.props.updateProjectImageSrc(this.props.project._id);
    });
  }

  send = (e) => {
    const data = new FormData();
    data.append("id", this.props.project._id);
    data.append("file", this.state.file);

    this.props
      .editProjectImage(data)
      .then(() => this.props.updateProjectImageSrc(this.props.project._id))
      .then(() => {
        if (this.props.error) {
          alert(this.props.error);
          this.props.clearProjectError();
          return;
        }
        this.toggle();
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleChange = (e) => {
    const file = e.target.files[0];
    this.setState({ ...this.state, file: file });
  };

  displayImage = () => {
    if (
      this.props.project.author &&
      this.props.currentUserId === this.props.project.author._id
    ) {
      // enable toggling modal if current user is author
      return (
        <div>
          <div style={{ marginBottom: "2rem" }} onClick={this.toggle}>
            <img
              src={this.props.imageSrc}
              class="figure-img img-fluid mx-auto project-detail-image"
              alt="Click here to change ima"
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            ></img>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ marginBottom: "2rem" }}>
          <img
            src={this.props.imageSrc}
            class="figure-img img-fluid mx-auto"
            alt="Project"
            style={{ maxHeight: "200px", maxWidth: "200px" }}
          ></img>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.displayImage()}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Change Project Poster</ModalHeader>
          <ModalBody>
            <Form action="#">
              <FormGroup>
                <input
                  className="form-control-file"
                  type="file"
                  id="file"
                  accept=".jpg"
                  onChange={this.handleChange}
                ></input>
              </FormGroup>
              <button className="btn btn-primary" onClick={this.send}>
                Submit
              </button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  project: state.project.project,
  imageSrc: state.project.imageSrc,
  currentUserId: state.user.user._id,
  error: state.project.error,
});

export default connect(mapsStateToProps, {
  getProject,
  editProject,
  editProjectImage,
  updateProjectImageSrc,
  clearProjectError,
})(ProjectChangeImageModal);
