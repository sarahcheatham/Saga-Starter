import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreState from "../../Store/state";

class ProfileInfo extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <p style={{textAlign: 'center'}}> Profile Info Component</p>
        </div>
        <div>
          <p> First Name: {this.props.user.firstName}</p>
          <p> Last Name: {this.props.user.lastName}</p>
          <p> Email: {this.props.user.email}</p>
        </div>
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