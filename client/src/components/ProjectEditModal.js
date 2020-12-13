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
import { getProject, editProject } from "../actions/projectActions";

export class ProjectModal extends Component {
  state = {
    modal: false,
    name: this.props.project.project.name,
    description: this.props.project.project.description,
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
    };

    this.props.editProject(this.props.project.project._id, newProject);

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
          Edit this project
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <FormGroup>
                <Label for="project">Project</Label>
                <Input
                  type="text"
                  name="name"
                  id="project"
                  placeholder="Project Name"
                  onChange={this.onChange}
                  value={this.state.name}
                ></Input>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                  value={this.state.description}
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Edit Project
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

export default connect(mapsStateToProps, { getProject, editProject })(
  ProjectModal
);
