import axios from 'axios';
import { call, put, takeEvery, all, delay } from "redux-saga/effects";
import { ACTION_TYPE } from "../Store/types";
import testProfileData from "../api/testProfileData";

/** for the sake of things I'm going to mock the api calls and not build out some api on the side. The important thing
 * you gather here is the flow of the saga. You can literally dispatch whatever you need, when you need it.
 *
 * */

// mocking the request
const mockApiCall = () => testProfileData;

function* fetchBatchDataAsync() {
  const url = '/batch/status/359';
  const batchOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    //   Authorization: '' // whatever authorization your app required. bearer token probably.
    },
    url
  };

  /** this is the actual promise you will send into the yield call (apiCall) section below*/
  const apiCall = () => {
    return axios(batchOptions).then(
      res => res
    ).catch(err => {
      throw err
    });
  };
  /** turn loading flag on as we fetch for the things*/
  yield put({
    type: ACTION_TYPE.FETCH_BATCH_STATUS_LOADING
  });
//   yield delay(3000); // delay here to showcase the loading higher or component
  try {
    const result = yield call(apiCall);
    yield put({
      type: ACTION_TYPE.FETCH_BATCH_STATUS_SUCCESS,
      data: result
    });
  } catch (err) {
    yield put({
      type: ACTION_TYPE.FETCH_BATCH_STATUS_FAILED,
      error: err
    });
  }
  /** turn loading flag off once things have been completed, success or fail.*/
  yield put({
    type: ACTION_TYPE.FETCH_BATCH_STATUS_LOADING
  });
}

function* fetchBatchData() {
  yield takeEvery(ACTION_TYPE.FETCH_BATCH_STATUS_ASYNC, fetchBatchDataAsync)
}

export default function* fetchBatchSaga() {
  yield all([
    fetchBatchData(),
  ])
}