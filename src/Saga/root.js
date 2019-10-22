import { all } from 'redux-saga/effects';
import fetchProfileSaga from "./Profile";
import fetchBatchSaga from './Batches';
export default function* rootSaga() {
  yield all([
    fetchProfileSaga(),
    fetchBatchSaga()
  ])
}