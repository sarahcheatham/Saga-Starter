import React, {Component} from 'react';
import { connect } from 'react-redux';
import StoreState from "../../Store/state";
import { fetchUserProfileInfo } from "../../Store/actions";
import WithLoading from "../../Components/HOC/WithLoading";
import ProfileInfo from '../../Components/ProfileInfo';

/** on App.js I will handle my fetching of user data. It will only call for the data when the component mounts, app.js
 * is a top level component so it will mount every time the DOM tree is rebuilt. But I wont map the state of the store
 * state here. I'll map it in it's own component to show the usefulness of redux and the global storeState.
 * */

const ProfileInfoLoading = WithLoading(ProfileInfo);
class App extends Component {

  componentDidMount() {
    this.props.fetchUserProfileInfo()
  }

  render() {
    return (
      <div>
        <p style={{textAlign: 'center'}}>APP JS!</p>
        <div>
          <ProfileInfoLoading isLoading={this.props.loadingUserInfo} />
        </div>
      </div>
    )
  }
}


// So this is why I have redux-thunk. Thunk allows me to dispatch more than just an object. But rather I can dispatch
// functions too. Saga won't let you do that and I find this to be a really clean way to go about things.
// really is just personal preference. Not a deal breaker if you aren't into it.
const mapStateToProps = (state = StoreState.profile) => {
  return {
    loadingUserInfo: state.profile.loadingUserInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfileInfo: () => {
      dispatch(fetchUserProfileInfo())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
