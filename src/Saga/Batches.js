import axios from 'axios';
import { call, put, takeEvery, all, take, race } from "redux-saga/effects";
import { ACTION_TYPE } from "../Store/types";
import testProfileData from "../api/testProfileData";
import testPieChartData from '../api/testPieChartData';

/** for the sake of things I'm going to mock the api calls and not build out some api on the side. The important thing
 * you gather here is the flow of the saga. You can literally dispatch whatever you need, when you need it.
 *
 * */
const delay = duration => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}
// mocking the request
// const mockApiCall = () => testProfileData;
const mockApiCall = () => testPieChartData;

function* fetchBatchDataAsync(action) {
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
  while(true){
    try {
      const result = yield call(mockApiCall);

      // USE FOR mockApiCall
      yield put({
        type: ACTION_TYPE.FETCH_BATCH_STATUS_SUCCESS,
        data: result
      });

      // USE FOR apiCall

      // yield put({
      //   type: ACTION_TYPE.FETCH_BATCH_STATUS_SUCCESS,
      //   data: result.data
      // });

      yield put({
        type: ACTION_TYPE.START_POLLING
      })
      yield call(delay, 10000)
      yield put({
        type: ACTION_TYPE.STOP_POLLING
      })
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
}

function* watchPollSaga(){
  while(true){
    const data = yield take(ACTION_TYPE.START_POLLING)
    yield race([call(fetchBatchData, data), take(ACTION_TYPE.STOP_POLLING)])
  }
}

function* fetchBatchData() {
  yield takeEvery(ACTION_TYPE.FETCH_BATCH_STATUS_ASYNC, fetchBatchDataAsync)
}

export default function* fetchBatchSaga() {
  yield all([
    fetchBatchData(),
    watchPollSaga()
  ])
}