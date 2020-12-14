import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

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

  getImgSource = () => {
    const { img } = this.props.project;

    if (!img) {
      return "";
    }

    var base64Flag = "data:image/jpeg;base64,";

    var imageStr = this.arrayBufferToBase64(img.data.data);
    return base64Flag + imageStr;
  };

  send = (e) => {
    const data = new FormData();
    data.append("id", this.props.project._id);
    data.append("file", this.state.file);

    this.props.editProjectImage(data).then(() => {
      this.props.updateProjectImageSrc(this.getImgSource());
    });

    // close modal
    this.toggle();
  };

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
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
          Edit this project
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
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
