/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notifyRemove } from './notifyslice.js';

export default function NotifyReduxList(){

  const dispatch = useDispatch()

  const notifies = useSelector(state => state.notifyredux)
  console.log("notifies");
  console.log(notifies);

  function clickRemoveID(id){
    dispatch(notifyRemove({id:id}))
  }
  // notify.message.substring(0, 100)
  const renderNotifies = notifies.map(notify => (
    <article className="post-excerpt" key={notify.id}>
      <p className="post-content">{notify.message}</p> <button onClick={()=>clickRemoveID(notify.id)}>Delete</button>
    </article>
  ))
  
  return (
    <div>
      <label> Notify </label>
      {
      renderNotifies
      }
    </div>
  )
}