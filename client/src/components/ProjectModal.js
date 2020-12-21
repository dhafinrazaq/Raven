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

export class ProjectModal extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
    };

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
                  required
                  type="text"
                  name="name"
                  id="project"
                  placeholder="Add project"
                  onChange={this.onChange}
                ></Input>
                <Label for="description">Description</Label>
                <Input
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                ></Input>
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
