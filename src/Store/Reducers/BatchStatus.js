import StoreState from '../state';
import { ACTION_TYPE } from "../types";

const batchStatusReducers = (state = StoreState.batches, action) => {
  const { type, data, error } = action;
  switch(type) {
    case ACTION_TYPE.FETCH_BATCH_STATUS_LOADING:
      return {
        ...state,
        loadingStatus: !state.loadingStatus
      };
    case ACTION_TYPE.FETCH_BATCH_STATUS_SUCCESS:
      return {
        ...state,
        batchStatus: data
      };
    case ACTION_TYPE.FETCH_BATCH_STATUS_FAILED:
      return {
        ...state,
        errorStatus: error
      };
    case ACTION_TYPE.START_POLLING:
      return {
        ...state,
        isPolling: true
      }
    case ACTION_TYPE.STOP_POLLING:
      return {
        ...state,
        isPolling: false
      }
    default:
      return {
        ...state
      }
  }
};

export default batchStatusReducers;