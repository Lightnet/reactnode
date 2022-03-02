/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Note that nofity message require text string and not reactjs element due to reudex.
    
    A non-serializable value was detected in the state, in the path: `notifyredux.children.$$typeof`. Value: Symbol(react.element) 

    Note:
       action.payload.id <= redux
       action.id <- react

*/

// https://lzomedia.com/blog/how-to-remove-object-from-initialstate-array-redux-toolkit-typescript/
// https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
import { createSlice } from '@reduxjs/toolkit';
//import React from 'react';
import { nanoid16 } from '../../lib/helper.mjs';

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
      //console.log(action.payload.id);
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
  //notifyAdded 
  notifyAdd
  , notifyRemove
  , notifyClear
} = notifySlice.actions;

export default notifySlice.reducer;