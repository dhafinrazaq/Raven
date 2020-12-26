import React, { Component } from "react";
import { getSpecifiedUserDataController } from "../../actions/userActions";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getImgSource } from "../../helpers/imageProcessing";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getSpecifiedUserDataController(this.props.query);
  }

  render() {
    return (
      <Container>
        <div className="row mb-2 pb-2">
          <h1 class="text-center">
            {" "}
            {this.props.userObserved
              ? this.props.userObserved.viewedUser.username
              : ""}
          </h1>
        </div>
        <div className="row">
          <ul className="project-list">
            {this.props.userObserved
              ? this.props.userObserved.viewedUser.projects.map(
                  ({ _id, name, img }) => (
                    <Link
                      to={{ pathname: "/projects/" + _id + "?#" }}
                      key={_id}
                    >
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
                  )
                )
              : ""}
          </ul>
        </div>
      </Container>
    );
  }
}

UserProfile.propTypes = {
  getSpecifiedUserDataController: PropTypes.func.isRequired,
  userObserved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userObserved: state.user.userDetail,
  // userObservedName: state.user.userDetail.username,
  // userObservedProjects: state.user.userDetail.projects,
});

export default connect(mapStateToProps, { getSpecifiedUserDataController })(
  UserProfile
);
