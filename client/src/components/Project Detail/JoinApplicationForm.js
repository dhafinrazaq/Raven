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
import { addJoinApplication } from "../../actions/projectActions";

export class JoinApplicationForm extends Component {
  state = {
    modal: false,
    answer: "",
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

    const newApplication = {
      answer: this.state.answer,
    };

    this.props.addJoinApplication(this.props.project._id, newApplication);

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
            <Form onSubmit={this.onSubmit}>
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
  project: state.project.project,
});

export default connect(mapsStateToProps, { addJoinApplication })(
  JoinApplicationForm
);
