import StoreState from '../state';
import { ACTION_TYPE} from "../types";

const profileReducers = (state = StoreState.profile, action) => {
  const { type, data, error } = action;
  switch(type) {
    case ACTION_TYPE.FETCH_USER_PROFILE_LOADING:
      return {
        ...state,
        loadingUserInfo: !state.loadingUserInfo
      };
    case ACTION_TYPE.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: data
      };
    case ACTION_TYPE.FETCH_USER_PROFILE_FAILED:
      return {
        ...state,
        userInfoRequestError: error
      };
    default:
      return {
        ...state
      }
  }
};

export default profileReducers;