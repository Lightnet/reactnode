
import React from 'react';
import { nanoid16 } from '../../lib/helper.js';
import { useNotifty } from './notify.js';

export default function NotiftyTestv2(){

  const {dispatchNotify} = useNotifty();

  let id = nanoid16();
  function clickInfo(){
    //setNotify(nInfo( <label> Test </label>,true ))
    dispatchNotify({
      type: 'add'
      , id: nanoid16()
      , children: <label>Test</label>
      , autoClose: true
    })
  }

  function clickInfoR(){
    //setNotify(nInfo( <label> Test </label>,true ))
    dispatchNotify({
      type: 'remove'
      , id: nanoid16()
      , children: <label>Test</label>
      , autoClose: true
    })
  }

  function clickClear(){
    //setNotify(nInfo( <label> Test </label>,true ))
    dispatchNotify({
      type: 'clear'
    })
  }

  return <>
    <button onClick={clickInfo}> Test Info </button>
    <button onClick={clickInfoR}> Test InfoR </button>
    <button onClick={clickClear}> Test InfoR </button>
  </>
}