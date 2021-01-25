import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardBody,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import JoinApplicationForm from "./Project Detail/JoinApplicationForm";
import {
  getProjectCollaborators,
  clearProjectError,
} from "../actions/projectActions";

export class ProjectContributorSidebar extends Component {
  state = {
    activeTab: "1",
    isErrorVisible: true,
  };

  componentDidMount() {
    if (this.props.project !== null && this.props.project !== undefined) {
      this.props.getProjectCollaborators(this.props.project._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      console.log(this.props.project._id);
      this.props.getProjectCollaborators(this.props.project._id);
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  setActiveTab = (tab) => {
    this.setState({ ...this.state, activeTab: tab });
  };

  onDismiss = () => {
    this.setState({ ...this.state, isErrorVisible: false });
    this.props.clearProjectError();
  };

  render() {
    const projectAuthorUsername = this.props.projectAuthor
      ? this.props.projectAuthor.username
      : "";

    return (
      <div>
        {this.props.error && (
          <Alert
            color="info"
            isOpen={this.state.isErrorVisible}
            toggle={this.onDismiss}
          >
            {this.props.error}
          </Alert>
        )}

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Developers
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Card>
              <CardBody>
                <JoinApplicationForm></JoinApplicationForm>
                <ul>
                  <li>
                    <Link
                      to={{
                        pathname: "/account/" + projectAuthorUsername,
                      }}
                    >
                      {projectAuthorUsername}
                    </Link>
                  </li>
                  {this.props.projectCollaborators &&
                    this.props.projectCollaborators.map((collaborator) => (
                      <li>
                        <Link
                          to={{
                            pathname: "/account/" + collaborator.username,
                          }}
                        >
                          {collaborator.username}
                        </Link>
                      </li>
                    ))}
                </ul>
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

ProjectContributorSidebar.propTypes = {
  projectAuthor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  projectAuthor: state.project.project.author,
  projectCollaborators: state.project.collaborators,
  error: state.project.error,
});

export default connect(mapStateToProps, {
  getProjectCollaborators,
  clearProjectError,
})(ProjectContributorSidebar);
