/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    It very simple as emulation but in react format. 
    - addEventListener
    - removeEventListener

*/


import React,{ createContext, useContext, useMemo, useReducer } from "react";

export const EventContext = createContext();

export function useEvent(){
  const context = useContext(EventContext);
  if (!context) {
    throw new Error(`useEvent must be used within a EventContext`)
  }
  return context;
}

// this is dispatch events
function reducerEvent(state, action) {
  //console.log(action);
  switch (action.type) {
    case 'EVENT':
      if(action.data){
        return {...state, name:action.name,data:action.data }
      }else{
        return {...state, name:action.name, data:{target:{value:null}}}
      }
    default:
      return state;
  }
}

// need to top layer of app where Providers
export function EventProvider(props){
  //     state     dispatch          useReducer/ function     /init variable
  const [event, dispatchEvent] = useReducer(reducerEvent, {name:"",data:{ target:{value:null} }});

  const value = useMemo(()=>({
    event, dispatchEvent
  }),[
    event
  ])

  return <EventContext.Provider value={value} {...props} />
}





