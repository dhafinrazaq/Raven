import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProjectJoinApplicationList } from "../../actions/projectActions";

export class JoinApplicationList extends Component {
  state = {
    applications: [],
  };

  componentDidMount() {
    this.props.getProjectJoinApplicationList(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.applications !== prevProps.applications) {
      this.setState({ ...this.state, applications: this.props.applications });
    }
  }

  render() {
    return (
      <div>
        Hello
        {this.state.applications.map((application) => (
          <React.Fragment>
            <Link
              to={{
                pathname: `/projects/${this.props.id}/join/${application._id}`,
              }}
            >
              {application.answer}
            </Link>
            <br></br>
          </React.Fragment>
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
