/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://redux.js.org/tutorials/essentials/part-3-data-flow

import React, { useEffect, useState } from "react";
import { API } from "../../lib/API.mjs";
import useFetch from "../hook/useFetch.mjs";

export default function Posts(){

  const [posts, setPosts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [postID, setPostID] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(()=>{
    getPost();
  },[])

  async function getPost(){
    console.log("get post?")
    let data =await useFetch("/api/post",{
      method:'GET'
      , headers: {'Content-Type': 'application/json'}
    })
    console.log(data);
    if(data.error){
      console.log('Fetch error posts');
      return;
    }
    if(data.api=="POSTS"){
      setPosts(data.posts);
    }
  }

  async function deletePost(id){
    let data =await useFetch("api/post",{
      method:API.DELETE
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.DELETE
        , id:id
      })
    })
    if(data.error){
      console.log('Fetch error delete post');
      return;
    }
    if(data.api==API.DELETE){
      setPosts(state=>state.filter(item=>item.id !=data.id));
    }
  }

  return <>
    <label> Posts: </label>
    <div>
      {posts.map(item=><div key={item.id}>
        <label> Title: {item.title} </label> <button onClick={()=>deletePost(item.id)}> Delete </button> <br/>
        <label> Content:</label><br/>
        <section> {item.content}</section>
        </div>)}
    </div>
  </>
}