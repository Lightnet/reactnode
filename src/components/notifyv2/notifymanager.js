

import React,{ Children, useEffect } from "react";

import { useNotifty } from "./notify.js";

export default function NotifyManager(){

  const {
    notifies
    , dispatchNotify
  } = useNotifty();

  //useEffect(()=>{
    //console.log("state_notify...")
  //},[state_notify])

  //console.log(state_notify);

  function clickDelete(item){
    let _item = item;
    _item.type='remove';
    dispatchNotify({
      type:'remove'
      , id:item.id
    })
  }

  function clickDelete2(){
    dispatchNotify({
      type:'remove2'
      //, id:item.id
    })
  }

  return (<>
    <label>TEST NOTIFY</label>
    <button onClick={clickDelete2}>TEST NOTIFY</button>
    {
      
      notifies.map((item)=>{
        console.log("item");
        console.log(item);
        console.log(typeof item)
        //if(!item){
          //return <></>
        //}
        //console.log("item id",item.id)
        return <div key={item.id}>
          {item.Children}
          <button onClick={()=>clickDelete(item)}> Delete {item.id} </button>
        </div>
      })
      
    }
  </>)


  /*
  return (
  <NotifyContainer>

  </NotifyContainer>
  )
  */
}