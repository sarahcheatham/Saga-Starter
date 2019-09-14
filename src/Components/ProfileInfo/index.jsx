import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreState from "../../Store/state";


// the class component (although it could be a functional component) will only render AFTER the loading component is complete
// and it won't try and render any data unless the prop user exists and has the fullName property filled in
// otherwise it will notify the user, something went wrong and we couldn't fetch their info at this time.

class ProfileInfo extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <p style={{textAlign: 'center'}}> Profile Info Component</p>
        </div>
        {this.props.user && this.props.user.fullName ?
        <div>
          <p> First Name: {this.props.user.firstName}</p>
          <p> Last Name: {this.props.user.lastName}</p>
          <p> Email: {this.props.user.email}</p>
        </div>
          :
          <div>
            <p>Error in Pulling down user Info</p>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state = StoreState.profile) => {
  return {
  user: state.profile.user
  }
};

export default connect(mapStateToProps, null)(ProfileInfo);