import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { getProjectJoinApplicationList } from "../../actions/projectActions";

export class JoinApplicationList extends Component {
  state = {
    applications: [],
  };

  componentDidMount() {
    this.props.getProjectJoinApplicationList(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.applications !== this.state.applications) {
      this.setState({ ...this.state, applications: this.props.applications });
    }
  }

  render() {
    return (
      <div>
        Hello
        {this.state.applications.map((application) => (
          <div>{application.answer}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  applications: state.project.joinApplicationList,
});

export default connect(mapStateToProps, { getProjectJoinApplicationList })(
  JoinApplicationList
);
