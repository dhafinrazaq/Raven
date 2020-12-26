import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getImgSource } from "../helpers/imageProcessing";

export class ProjectList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props;

    return (
      <Container>
        <div className="row mb-2 pb-2">
          <h1 class="text-center">Projects List</h1>
        </div>

        <div className="row">
          <ul className="project-list">
            {projects.map(({ _id, name, img }) => (
              <Link to={{ pathname: "/projects/" + _id + "?#" }} key={_id}>
                <li className="project-list-item">
                  <figure class="figure">
                    <div class="row">
                      <img
                        src={getImgSource(img)}
                        class="figure-img img-fluid mx-auto"
                        alt="No image"
                        style={{
                          maxHeight: "200px",
                          maxWidth: "200px",
                          overflow: "hidden",
                        }}
                      ></img>
                    </div>

                    <h4
                      class="text-center"
                      style={{
                        wordWrap: "break-word",
                        width: "200px",
                        overflow: "hidden",
                        whiteSpace: "nowrap" /* Don't forget this one */,
                        textOverflow: "ellipsis",
                      }}
                    >
                      {name}
                    </h4>
                  </figure>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </Container>
    );
  }
}

ProjectList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
});

export default connect(mapStateToProps, { getProjects })(ProjectList);
