// https://www.valentinog.com/blog/redux/
//import { createStore } from "redux";
//import rootReducer from "../reducers/index.js";
//export default createStore(rootReducer);

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../counter/counterslice.js"
import notifyReducer from "../notifyredux/notifyslice.js"
export default configureStore({
  reducer: {
    counter: counterReducer
    , notifies: notifyReducer // state varaible
  }
})