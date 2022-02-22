

# Custom Event Context 
  This simple set up as it used event react components but note that has be in context to work.

  If your outside then read the hook API. Just think of the document element. If your outside the doc area it will not work.


app.js
```js
// Example app top or root level
import React from 'react';
import { RoutePage } from './routepage.js';
import { ThemeProvider } from './theme/themeprovider.js';
import { BrowserRouter } from 'react-router-dom';
import { NotifyProvider } from './notify/notifyprovider.js';
import { EventProvider } from './event/EventProvider.js';

export default function App() {

  return (<>
    <EventProvider>
      <ThemeProvider>
        <NotifyProvider>
            <BrowserRouter>
              <RoutePage />
            </BrowserRouter>
        </NotifyProvider>
      </ThemeProvider>
    </EventProvider>
  </>);
}
```


EventProvider.js
```js
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
```


EventLog.js
```js
//listen to event context
import React,{ useEffect, useState } from "react";
import { useEvent } from "./EventProvider.js";

export default function EventLog(){

  const [log, setLog] = useState("");

  const {event} = useEvent();

  useEffect(()=>{
    //console.log(event)
    if(event.name=="test1"){
      MyEvent1(event.data)
    }
    if(event.name=="beta"){
      MyEvent2(event.data)
    }
  },[event])

  function MyEvent1(event){
    console.log("test::",event)
    setLog("test")
  }

  function MyEvent2(event){
    console.log("beta::",event)
    setLog("beta")
  }

  return <><label>{log}</label></>
}
```

EventTest.js
```js
import React from "react";
import { useEvent } from "./EventProvider.js";

export default function EventTest(){

  const {dispatchEvent} = useEvent();


  function clickEvent1(){
    dispatchEvent({
      type:'EVENT'
      , name:'test1'
      , data:{target:{value:"hello"}}
    })
  }

  function clickEvent2(){
    dispatchEvent({
      type:'EVENT'
      , name:'test2'
    })
  }

  function clickEvent3(){
    dispatchEvent({
      type:'EVENT'
      , name:'beta'
    })
  }

  return <>
    <button onClick={clickEvent1}> Test Event 1</button>
    <button onClick={clickEvent2}> Test Event 2</button>
    <button onClick={clickEvent3}> Beta Event 3</button>
  </>
}
```