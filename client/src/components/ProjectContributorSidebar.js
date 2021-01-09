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
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import JoinApplicationForm from "./Project Detail/JoinApplicationForm";
import { getProjectCollaborators } from "../actions/projectActions";

export class ProjectContributorSidebar extends Component {
  state = {
    activeTab: "1",
  };

  componentDidMount() {
    if (this.props.project !== null && this.props.project !== undefined) {
      this.props.getProjectCollaborators(this.props.project._id);
    }
  }

  componentDidUpdate(prevProps) {
    console.log("update");
    if (this.props.project !== prevProps.project) {
      this.props.getProjectCollaborators(this.props.project._id);
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  setActiveTab = (tab) => {
    this.setState({ ...this.state, activeTab: tab });
  };

  render() {
    const projectAuthorUsername = this.props.projectAuthor
      ? this.props.projectAuthor.username
      : "";

    return (
      <div>
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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Investors
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Card>
              <CardBody>
                <JoinApplicationForm></JoinApplicationForm>
                <Link
                  to={{
                    pathname: "/account/" + projectAuthorUsername,
                  }}
                >
                  {projectAuthorUsername}
                </Link>
                {this.props.projectCollaborators !== undefined &&
                  this.props.projectCollaborators.map((collaborator) => (
                    <Link
                      to={{
                        pathname: "/account/" + collaborator.username,
                      }}
                    >
                      {collaborator.username}
                    </Link>
                  ))}
              </CardBody>
            </Card>
          </TabPane>
          <TabPane tabId="2">
            <Row></Row>
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
  projectAuthor: state.project.project.author,
  projectCollaborators: state.project.collaborators,
});

export default connect(mapStateToProps, { getProjectCollaborators })(
  ProjectContributorSidebar
);
