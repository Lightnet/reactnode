/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://reactjs.org/docs/hooks-reference.html#usereducer
// https://www.robinwieruch.de/javascript-reducer/
// https://blog.logrocket.com/guide-to-react-usereducer-hook/
// https://alligator.io/react/usereducer/
// 

/*
const reducer = (people, action) => {
  if(action.type == 'chomp') {
    return people.map(person => {
      if(person.name == action.payload) {
        person.alive = false;
      }
      return person;
    })
  }
  if(action.type == 'revive') {
    return people.map(person => {
      if(person.name == action.payload) {
        person.alive = true;
      }
      return person;
    })
  }
}

*/


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
    throw new Error(`useNotifty must be used within a nottifyContext`)
  }
  return context;
}

function init_notify(initialCount) {
  if(!initialCount){
    initialCount=0;
  }
  return {notifies: initialCount};
}

function reducer_notify(state, action) {
  switch (action.type) {
    case 'increment':
      return {notifies: state.notifies + 1};
    case 'decrement':
      return {notifies: state.notifies - 1};
    case 'reset':
        return init_notify(action.payload);
    default:
      throw new Error();
  }
}

export function NottifyProvider(props){
  const [state_notify, dispatchNotify] = useReducer(reducer_notify, 0 , init_notify);

  const [notify, setNotify] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const value = useMemo(()=>({
    notifications, setNotifications,
    notify, setNotify,
    state_notify, dispatchNotify
  }),[
    notifications,
    notify,
    state_notify
  ])

  return <nottifyContext.Provider value={value} {...props} />
}