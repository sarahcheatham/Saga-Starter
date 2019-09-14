import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Saga/root';
import { rootReducer } from './Reducers';
import {composeWithDevTools} from "redux-devtools-extension";

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const bindMiddleware = (middleware) => {
    if ( process.env.NODE_ENV !== 'production' ) {
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware);
  };

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware, thunk])
  );
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();

  return store
};

export default configureStore;