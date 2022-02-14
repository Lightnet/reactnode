import React from 'react'
import { useSelector } from 'react-redux'

export default function NotifyList(){

  const notifies = useSelector(state => state.notifies)

  const renderNotifies = notifies.map(notify => (
    <article className="post-excerpt" key={notify.id}>
      <h3>{notify.title}</h3>
      <p className="post-content">{notify.content.substring(0, 100)}</p>
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