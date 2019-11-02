import { createStore, compose, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";

import authReducer from "../containers/Auth/Auth.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer
});

// const initializeStore = () => createStore( reducers, composeEnhancers( applyMiddleware( thunk ) ) );
const initializeStore = () => createStore( reducers, composeEnhancers() );

export default initializeStore;
