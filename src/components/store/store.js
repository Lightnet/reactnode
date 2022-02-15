/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.valentinog.com/blog/redux/
//import { createStore } from "redux";
//import rootReducer from "../reducers/index.js";
//export default createStore(rootReducer);

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../counter/counterslice.js"
import notifySlice from "../notifyredux/notifyslice.js"
export default configureStore({
  reducer: {
    counter: counterReducer
    , notifyredux: notifySlice // state varaible
  }
})