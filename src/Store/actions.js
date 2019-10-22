import { ACTION_TYPE } from "./types";

/** ACTIONS ARE WHAT KICK OFF A REDUX 'EVENT'. THIS MAY ONLY BE LISTENED TO BY A REDUCER , WHERE YOU WILL PROGRAM
 * WHAT THE NEXT STATE WILL PUSHED TO THE storeState, THUS TO A COMPONENT. OR, THE ACTION MAY DISPATCH A TYPE
 * LISTENED TO< BY A SAGA, AND ASYNC FUNCTIONS WILL BE CALLED. THE SAME REDUCER LOGIC WILL APPLY FOR WHEN A SAGA IS
 * RETURNED. THE SAGA WILL DEPLOY A TYPE TO THE STORE, AND A REDUCER WILL LISTEN FOR IT, AND YOU PROGRAM WHAT THE NEXT
 * STATE WILL BE AND PUSH IT THROUGH.
 * */


// fetch the user info from an api. notice the type deployed has async on the end of it. This means its a saga and to
// look there for the next steps in the process. The name of the saga will match the name of the reducer.
/** FOUND IN APP.JS!*/
export const fetchUserProfileInfo = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPE.FETCH_USER_PROFILE_ASYNC
    })
  }
};

export const fetchBatchStatus = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPE.FETCH_BATCH_STATUS_ASYNC
    })
  }
};