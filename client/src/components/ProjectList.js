import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../actions/projectActions";
import PropTypes from "prop-types";

export class ProjectList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { projects } = this.props.project;

    return (
      <Container>
        <ListGroup horizontal>
          {projects.map(({ id, name }) => (
            <ListGroupItem>
              <Button
                className="remove-btn"
                color="danger"
                size="sm"
                onClick={this.onDeleteClick.bind(this, id)}
              >
                x
              </Button>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

ProjectList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects, deleteProject })(
  ProjectList
);
