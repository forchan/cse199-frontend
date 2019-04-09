import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const configureStore = () => {
  let store = createStore(rootReducer, applyMiddleware(thunk));
  console.log(store.getState());
  return store;
};

export default configureStore;
