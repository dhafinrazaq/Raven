import { Container, Button } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProjectJoinApplication,
  acceptProjectJoinApplication,
} from "../../actions/projectActions";

class JoinApplication extends Component {
  state = {
    application: [],
  };

  handleAccept = () => {
    this.props.acceptProjectJoinApplication(this.props.id, this.props.joinId);
  };

  componentDidMount() {
    this.props.getProjectJoinApplication(this.props.id, this.props.joinId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.application !== prevProps.application) {
      this.setState({ ...this.state, application: this.props.application });
    }
  }

  render() {
    return (
      <div>
        {this.state.application.answer}
        <Button onClick={this.handleAccept}>Accept</Button>
        <Button>Reject</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  application: state.project.joinApplication,
});

export default connect(mapStateToProps, {
  getProjectJoinApplication,
  acceptProjectJoinApplication,
})(JoinApplication);
