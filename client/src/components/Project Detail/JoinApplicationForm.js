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
import { getProject, editProject } from "../../actions/projectActions";

export class JoinApplicationForm extends Component {
  state = {
    modal: false,
    answer: "",
  };

  componentDidMount() {
    // this.props.getProject(this.props.id).then(() => {
    //   this.setState({
    //     ...this.state,
    //     name: this.props.project.project.name,
    //     description: this.props.project.project.description,
    //   });
    // });
  }

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
          style={{ marginBottom: "2rem", marginTop: "1rem" }}
          onClick={this.toggle}
        >
          Join
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Join Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <FormGroup>
                <Label for="answer">Answer</Label>
                <Input
                  required
                  type="text"
                  name="answer"
                  id="answer"
                  placeholder="Answer"
                  onChange={this.onChange}
                  value={this.state.answer}
                ></Input>
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Join
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
  JoinApplicationForm
);
