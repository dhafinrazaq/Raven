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
        <h1 class="text-center">Projects List</h1>
        <ul className="project-list">
          {projects.map(({ _id, name, img }) => (
            <Link to={{ pathname: "/projects/" + _id + "?#" }} key={_id}>
              <li className="project-list-item">
                <figure class="figure">
                  <div class="row" style={{textAlign: "center"}}>
                    <div class="col-md-8 offset-md-2">
                      <img
                        src={getImgSource(img)}
                        class="figure-img img-fluid mx-auto"
                        alt="No image"
                        style={{ maxHeight: "300px", maxWidth: "300px", textAlign : "center"}}
                      ></img>
                    </div>
                  </div>
                  <h4
                    class="text-center"
                    style={{ wordWrap: "break-word", width: "300px" }}
                  >
                    {name}
                  </h4>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
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
