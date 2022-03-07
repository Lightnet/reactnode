/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://redux.js.org/tutorials/essentials/part-3-data-flow

import React, { useState } from "react";
import { API } from "../../lib/API.mjs";
import useFetch from "../hook/useFetch.mjs";

export default function CreatePost(){

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function typeTitle(e){
    setTitle(e.target.value);
  }

  function typeContent(e){
    setContent(e.target.value);
  }

  async function createPost(e){
    let data = await useFetch("/api/post",{
      method:'POST'
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.TYPES.CREATE
        , title:title
        , content:content
      })
    })
    if(data.error){
      console.log(data.error)
      console.log('Fetch error create post');
      return;
    }
    if(data.api=="POST"){
      console.log(data.post);
    }
  }

  return <>
    <label> Title: </label><input value={title} onChange={typeTitle}/><br/>
    <label> Content: </label><br/>
    <textarea value={content} onChange={typeContent}/><br/>
    <button onClick={createPost}> Create Post </button>
  </>
}