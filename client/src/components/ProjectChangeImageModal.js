import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  getProject,
  editProject,
  editProjectImage,
  updateProjectImageSrc,
} from "../actions/projectActions";

export class ProjectChangeImageModal extends Component {
  state = {
    modal: false,
    file: null,
    img: "",
  };

  send = (e) => {
    const data = new FormData();
    data.append("id", this.props.project._id);
    data.append("file", this.state.file);

    this.props.editProjectImage(data).then(() => {
      this.props.updateProjectImageSrc(this.props.project._id);
    });

    // close modal
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Change Project Poster
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Change Project Poster</ModalHeader>
          <ModalBody>
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
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  project: state.project.project,
});

export default connect(mapsStateToProps, {
  getProject,
  editProject,
  editProjectImage,
  updateProjectImageSrc,
})(ProjectChangeImageModal);
