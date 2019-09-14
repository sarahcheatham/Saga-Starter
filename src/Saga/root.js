import { all } from 'redux-saga/effects';
import fetchProfileSaga from "./Profile";

export default function* rootSaga() {
  yield all([
    fetchProfileSaga()
  ])
}