import React, {Component} from 'react';
import { connect } from 'react-redux';
import StoreState from "../../Store/state";
import { fetchUserProfileInfo, fetchBatchStatus } from "../../Store/actions";
import WithLoading from "../../Components/HOC/WithLoading";
// import ProfileInfo from '../../Components/ProfileInfo';
import PieChart from '../../Components/PieChart/PieChart';
import "./App.css";

/** on App.js I will handle my fetching of user data. It will only call for the data when the component mounts, app.js
 * is a top level component so it will mount every time the DOM tree is rebuilt. But I wont map the state of the store
 * state here. I'll map it in it's own component to show the usefulness of redux and the global storeState.
 * */

// const ProfileInfoLoading = WithLoading(ProfileInfo);
const PieChartLoading = WithLoading(PieChart);
class App extends Component {

  componentDidMount() {
    // this.props.fetchUserProfileInfo();
    this.props.fetchBatchStatus();
    
  }

  render() {
    return (
      <div>
        <p style={{textAlign: 'center'}}>APP JS!</p>
        <div>
          {/* <ProfileInfoLoading isLoading={this.props.loadingUserInfo} /> */}
        </div>
        <div>
          <PieChartLoading isLoading={this.props.loadingStatus} isPolling={this.props.isPolling}/>
        </div>
      </div>
    )
  }
}


// So this is why I have redux-thunk. Thunk allows me to dispatch more than just an object. But rather I can dispatch
// functions too. Saga won't let you do that and I find this to be a really clean way to go about things.
// really is just personal preference. Not a deal breaker if you aren't into it.
const mapStateToProps = (state) => {
  return {
    // loadingUserInfo: state.profile.loadingUserInfo,
    loadingStatus: state.batches.loadingStatus,
    isPolling: state.batches.isPolling
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserProfileInfo: () => {
    //   dispatch(fetchUserProfileInfo())
    // },
    fetchBatchStatus: () => {
      dispatch(fetchBatchStatus())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
