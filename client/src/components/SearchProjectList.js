import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { getSearchProjects, deleteProject } from "../actions/projectActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getImgSource } from "../helpers/imageProcessing";

export class SearchProjectList extends Component {
  componentDidMount() {
    this.props.getSearchProjects(this.props.query);
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { projects } = this.props.project;

    return (
      <Container>
        <div className="row mb-2 pb-2">
          <h1 class="text-center">Search result : {this.props.query}</h1>
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
                        class="figure-img img-fluid mx-auto project-list-img"
                        alt="No image"
                      ></img>
                    </div>

                    <h4 class="text-center project-list-text">{name}</h4>
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

SearchProjectList.propTypes = {
  getSearchProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getSearchProjects, deleteProject })(
  SearchProjectList
);
