import React, { Component } from "react";
import PropTypes from "prop-types";
import { getProject, getProjects } from "../actions/projectActions";
import { connect } from "react-redux";

export class Project extends Component {
  componentDidMount() {
    // this.props.getProject(this.props.id);
    // console.log(this.props.project);
    this.props.getProjects();
  }

  render() {
    // const { name } = this.props.project;
    // console.log(this.props.project.project.name);
    const { projects } = this.props.project;

    return (
      <div>
        <h1>hello</h1>
        <h1>{this.props.id}</h1>
        {/* <h1>{name}</h1> */}
        {projects.map(({ _id, name }) => {
          if (_id === this.props.id) {
            return (
              <div>
                <img
                  src="https://via.placeholder.com/300.png/09f/fff"
                  class="figure-img img-fluid mx-auto"
                  alt="A generic square placeholder image with rounded corners in a figure."
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                ></img>

                <div class="text-center">{name}</div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject, getProjects })(Project);
