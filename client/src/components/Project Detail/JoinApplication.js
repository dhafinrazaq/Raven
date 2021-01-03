import { Container, Button } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectJoinApplication } from "../../actions/projectActions";

class JoinApplication extends Component {
  state = {
    application: [],
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
        <Button>Accept</Button>
        <Button>Reject</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  application: state.project.joinApplication,
});

export default connect(mapStateToProps, { getProjectJoinApplication })(
  JoinApplication
);
