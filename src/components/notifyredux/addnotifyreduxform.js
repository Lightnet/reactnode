

// https://redux.js.org/tutorials/essentials/part-3-data-flow

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { notifyAdd } from './notifyslice.js';

export const AddNotifyReduxForm = () => {
  const [colorType, setColorType] = useState('info')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const onColorChanged = e => setColorType(e.target.value)
  const onMessageChanged = e => setMessage(e.target.value)

  const onSavePostClicked = () => {
    if (message) {
      console.log("test");
      dispatch(
        notifyAdd({
          color:colorType
          , message:message
        })
      )
      //setMessage('')
    }
  }

  return (
    <section>
      <h2>Add Notify Redux Alert</h2>
      <form>
        <label htmlFor="postTitle">Type:</label>
        <select value={colorType} onChange={onColorChanged}>
          <option value="info"> info </option>
          <option value="success"> success </option>
          <option value="warning"> warning </option>
          <option value="error"> error </option>
        </select>
        <br />
        <label htmlFor="postContent">Content:</label><br />
        <textarea
          value={message}
          onChange={onMessageChanged}
        /><br />
        <button type="button" onClick={onSavePostClicked}>Redux Notify Post</button>
      </form>
    </section>
  )
}