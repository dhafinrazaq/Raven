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
import { addProject } from "../actions/projectActions";
import { v4 as uuid } from "uuid";

export class ProjectModal extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
    // projectImage: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onChangeFile = (e) => {
  //   this.setState({ ...this.state, projectImage: e.target.files[0] });
  //   console.log("files");
  //   console.log(e.target.files);
  // };

  onSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", this.state.name);
    // formData.append("description", this.state.description);
    // formData.append("projectImage", this.state.projectImage);

    const newProject = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
    };

    // console.log("formdata: ");
    // var object = {};
    // formData.forEach((value, key) => (object[key] = value));
    // var json = JSON.stringify(object);
    // console.log(json);

    //   add project via addProject method
    // this.props.addProject(formData);
    this.props.addProject(newProject);

    // close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Project
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Project List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <FormGroup>
                <Label for="project">Project</Label>
                <Input
                  type="text"
                  name="name"
                  id="project"
                  placeholder="Add project"
                  onChange={this.onChange}
                ></Input>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                ></Input>
                {/* <FormGroup>
                  <label for="projectImage">Upload poster</label>
                  <input
                    type="file"
                    id="projectImage"
                    name="projectImage"
                    placeholder="image"
                    onChange={this.onChangeFile}
                    filename="projectImage"
                    className="form-control-file"
                  ></input>
                </FormGroup> */}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Project
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapsStateToProps, { addProject })(ProjectModal);
