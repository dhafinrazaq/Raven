import React, { Component } from "react";
import PropTypes from "prop-types";
import { getProject } from "../actions/projectActions";
import { connect } from "react-redux";

export class ProjectDescription extends Component {
  render() {
    const description = this.props.project.project.description;

    return <div>{description}</div>;
  }
}

ProjectDescription.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject })(ProjectDescription);
