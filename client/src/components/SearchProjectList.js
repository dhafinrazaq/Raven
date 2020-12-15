import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getSearchProjects, deleteProject } from "../actions/projectActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
        <h1 class="text-center">Search result : {this.props.query}</h1>
        <ul className="project-list">
          {projects.map(({ _id, name }) => (
            <Link to={{ pathname: "/projects/" + _id }} key={_id}>
              <li className="project-list-item">
                <figure class="figure">
                  <div class="row">
                    <div class="col-md-8 offset-md-2">
                      <img
                        src="https://via.placeholder.com/300.png/09f/fff"
                        class="figure-img img-fluid mx-auto"
                        alt="A generic square placeholder image with rounded corners in a figure."
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      ></img>
                    </div>
                  </div>

                  <h4 class="text-center">{name}</h4>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
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
