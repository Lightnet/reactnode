/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function PostPage(){

  return <div>
  <div>
    <label> Post: </label>
      <Link to={"/post"}>Post</Link><span> | </span>
      <Link to={"createpost"}>Create Post</Link><span> | </span>
  </div>
  <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="createpost" element={<CreatePost />}/>
    </Routes>
</div>
}