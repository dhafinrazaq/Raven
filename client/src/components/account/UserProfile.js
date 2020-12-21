import React, { Component } from "react";
import { getAnyUserDataController } from "../actions/userActions";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getAnyUserDataController(this.props.query);
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.props.userObserved}</div>
        <ul>
          {this.props.userObservedprojects.map(({ _id, name, img }) => (
            <Link to={{ pathname: "/projects/" + _id }} key={_id}>
              <li className="project-list-item">
                <figure class="figure">
                  <div class="row">
                    <div class="col-md-8 offset-md-2">
                      <img
                        src={this.setImgSource(img)}
                        class="figure-img img-fluid mx-auto"
                        alt="No image"
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userObserved: state.user,
  projects: state.user.user.projects,
});

export default connect(mapStateToProps, { getAnyUserDataController })(
  UserProfile
);
