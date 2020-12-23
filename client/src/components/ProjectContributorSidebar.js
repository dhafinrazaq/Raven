import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

export class ProjectContributorSidebar extends Component {
  state = {
    activeTab: "1",
  };

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
                <Link
                  to={{
                    pathname: "/account/" + projectAuthorUsername,
                  }}
                >
                  {projectAuthorUsername}
                </Link>
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
});

export default connect(mapStateToProps, {})(ProjectContributorSidebar);
