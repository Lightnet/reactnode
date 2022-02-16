# notify redux

# Information:
  It almost the same logic but with extra feature to able to call more type function dispatch call.

  Note there two types I found there for the used for Reducers. 

# Layout:


App.js
```js
import { Provider } from "react-redux";
import store from "./store/store.js";
//..
export default function App() {

  return (<>
    <Provider store={store}>
      <ThemeProvider>
        <NotifyProvider>
          <AuthProvider>
            <BrowserRouter>
              <RoutePage />
            </BrowserRouter>
          </AuthProvider>
        </NotifyProvider>
      </ThemeProvider>
    </Provider>
  </>);
}
```

./routepage.js
```js
import React from 'react';
import NotifyReduxManager from './notifyredux/notifyreduxmanager.js';
//..

export function RoutePage() {

  return (
  <>
    <div>
      <NavBarTop />
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    <NotifyManager />
    <NotifyReduxManager />
  </>)
}
```
  Please any where the where the notify list will display.


./store/store.js
```js
import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from "../counter/counterslice.js"
import notifySlice from "../notifyredux/notifyslice.js"
export default configureStore({
  reducer: {
    //counter: counterReducer
    , notifyredux: notifySlice // state varaible
  }
})
```

./notifyredux/notifyslice.js
```js
import { createSlice } from '@reduxjs/toolkit';
//import React from 'react';
import { nanoid16 } from '../../lib/helper.js';

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

const initialState = []

const notifySlice = createSlice({
  name: 'notifyredux',
  initialState,
  //initialState:[],
  reducers: {
    notifyAdd:(state, action)=>{
      let color =  action.payload.color || Color.info; //default to info
      let autoClose =  action.payload.autoClose || true; //default autoclose true
      let id =  action.payload.id || nanoid16(); //default random id
      let message;
      //console.log(typeof action.payload.message);
      if(typeof action.message == 'object'){
        message=action.payload.message;
      }else{//string, number, bool is convert check to string
        message=action.payload.message
      }
      return [
        ...state,
        {color: color, id: id, message: message, autoClose: autoClose}
      ]
    },
    notifyRemove:(state, action)=>{
      console.log(action.payload.id);
      if(!action.payload.id){
        return state;
      }
      state = state.filter((item) => item.id != action.payload.id)
      return state;
      //return [state.filter((item) => item.id != action.payload.id)]//will not work
    },
    notifyClear:(state)=>{
      state=[];
      return state;
      //return []; // clear array
    }
  }
})

export const { 
    notifyAdd
  , notifyRemove
  , notifyClear
} = notifySlice.actions;

export default notifySlice.reducer;
```

./NotifyReduxTest.js
```js
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { notifyAdd, notifyClear, Color } from '<path to notifyredux>/notifyslice.js';

export default function NotifyReduxTest(){

  const notifies = useSelector(state => state.notifyredux)
  //console.log(notifies); // array

  const dispatch = useDispatch()

  function clickTest(){
    dispatch(
      notifyAdd({
        //id: nanoid(),
        color: Color.info //info, success, warning, error
        , message:"test" //can't used react object type as the redux will error 
      })
    )
  }

  function clickClear(){ //empty the array
    dispatch(
      notifyClear()
    )
  }

  return <>
    <button onClick={clickTest}> Notify Redux Add </button>
    <button onClick={clickClear}> Notify Redux Clear </button>
  </>
}
```