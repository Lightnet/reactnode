# Notofy

# Information:
  To kept the code most simple for notify call by using the context, provider and useReducer. By using the useReducer with state and dispatch call to handle the array params. Using the function on dispatch to filter out the message type and config then put into the array. Simple css color and position.

# api:

```js
import { useNotifty } from '<path>/notify/notify.js'; // depend where the file dir
  //...

  const {dispatchNotify} = useNotifty();
  //...

  dispatchNotify({//array
    type: 'add' // recommend add to array
    , color: "info" // info, success, warning, error // recommend type of message
    , id: nanoid16() // optional, delete event and reactjs key  
    , children: <label>Hello World</label> || "hello world"  // display message, recommend 
    , autoClose: true // optional 
  })
  
```

```js
import { useNotifty } from './notify.js';

export default function BlankNotifyInfo(){

  const {dispatchNotify} = useNotifty();

  function clickInfo1(){
    dispatchNotify({
      type: 'add'
      , children: <label>ASDASD</label>
    })
  }

  return<button onClick={clickInfo1}>info</button>
}
```
# setup:

App.js
```js

//...
import { NotifyProvider } from './notify/notify.js';

export default function App() {

  return (<>
    <ThemeProvider>
      <NotifyProvider>
        <AuthProvider>
          <BrowserRouter>
            <RoutePage />
          </BrowserRouter>
        </AuthProvider>
      </NotifyProvider>
    </ThemeProvider>
  </>);
}
```

routepage.js
```js
//...
import NotifyManager from './notify/notifymanager.js';
//...
export function RoutePage() {

  return (
  <>
    <div>
      <NavBarTop />
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {
        //...
      }
    </Routes>
    <NotifyManager />
  </>)
}
```

```js
import React from 'react';
import { nanoid16 } from '../../lib/helper.mjs';
import { useNotifty } from './notify.jsx';

export default function NotiftyTestv2(){

  const {dispatchNotify} = useNotifty();

  function clickInfo1(){
    dispatchNotify({
      type: 'add'
      , children: <label>ASDASD</label>
    })
  }

  function clickInfo2(){
    dispatchNotify({
      type: 'add'
      , color:'info'
      , id: nanoid16()
      , children: <label>info</label>
      , autoClose: true
    })
  }

  function clickSuccess(){
    dispatchNotify({
      type: 'add'
      , color:'success'
      , id: nanoid16()
      , children: <label>success</label>
      , autoClose: true
    })
  }

  function clickWarning(){
    dispatchNotify({
      type: 'add'
      , color:'warning'
      , id: nanoid16()
      , children: "Warning"
      , autoClose: true
    })
  }

  function clickError(){
    dispatchNotify({
      type: 'add'
      , color:'error'
      , children: <label>Error</label>
    })
  }

  function clickNotifyClear(){
    // clear array []
    dispatchNotify({
      type: 'clear'
    })
  }

  return <>
    <button onClick={clickInfo1}> Notify Info 1</button>
    <button onClick={clickInfo2}> Notify Info 2</button>
    <button onClick={clickSuccess}> Notify Success</button>
    <button onClick={clickWarning}> Notify Warning </button>
    <button onClick={clickError}> Notify Error</button>
    <button onClick={clickNotifyClear}> Notify Clear </button>
  </>
}
```