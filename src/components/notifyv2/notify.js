/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/54605190/successfully-firing-two-usereducer-hooks-in-a-row
// https://stackoverflow.com/questions/57280466/can-usereducer-work-with-an-array-for-state
// https://stackoverflow.com/questions/34582678/is-this-the-correct-way-to-delete-an-item-using-redux
// https://javascript.tutorialink.com/delete-element-from-array-in-redux-state-using-a-reducer-in-createslice/
// https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/

// working
// https://codesandbox.io/s/fragrant-browser-br6el?fontsize=14
// https://daveceddia.com/usereducer-hook-examples/

import React,{ createContext, useContext, useMemo, useReducer, useState } from "react";

export const nottifyContext = createContext();

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export function useNotifty(){
  const context = useContext(nottifyContext);
  if (!context) {
    throw new Error(`useNotifty must be used within a notifyContext`)
  }
  return context;
}

const initStateNotify={
  notifies:[]
}

function init_notify(initialCount) {
  if(!initialCount){
    initialCount=[];
  }
  return {notifies: initialCount};
}

function reducer_notify(state=initStateNotify, action) {
  let newState;

  switch (action.type) {
    case 'add':
      //need to double check same id to stop add
      //console.log(state);
      newState=state;
      newState.notifies.push(action);
      console.log(newState);
      //return {...state,notifies:newState.notifies};
      return {...state,notifies:newState.notifies};
    case 'remove':
      newState=state;
      newState.notifies = newState.notifies.filter(item => item.id !== action.id)
      //console.log(notifies)
      return {...state,notifies:newState.notifies};
    case 'remove2':
      newState=state;
      let id = newState.notifies[0].id;
      console.log(id);
      //console.log(newState);
      
      //newState.notifies = newState.notifies.filter(item => item.id !== id)
      //console.log(newState.notifies)
      //return {...state,notifies:newState.notifies};
      //return {...newState};
      //return {...state,notifies:state.notifies.filter(item => item.id !== id)}
      //return {...state,notifies:newState.notifies.filter(item => item.id !== id)}
      return {...state,notifies:[...state.notifies.filter(item => item.id !== id)]}
    case 'reset':
        return init_notify(action.payload);
    default:
      throw new Error();
  }
}


function reducerNotify(state, action) {
  switch (action.type) {
    // do something with the action
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          name: action.id
        }
      ];
    case 'remove':
      // keep every item except the one we want to remove
      return state.filter((item) => item.id != action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function NotifyProvider(props){
  //const [notifies, dispatchNotify] = useReducer(reducer_notify, initStateNotify , init_notify);

  const [notifies, dispatchNotify] = useReducer(reducerNotify, []);


  const [notify, setNotify] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const value = useMemo(()=>({
    notifications, setNotifications,
    notify, setNotify,
    notifies, dispatchNotify
  }),[
    notifications,
    notifies//,
    //state_notify
  ])

  return <nottifyContext.Provider value={value} {...props} />
}




