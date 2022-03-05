/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://sailsjs.com/documentation/reference/request-req/req-accepts

import React from "react";
import useFetch from "../hook/useFetch.mjs";

export default function BtnFetch(){

  async function clickFetch(){
    let data = await useFetch("/agent",{
      method:'GET'
      //, headers: {
        //  'Content-Type': 'application/json; charset=utf-8'
        //, 'Accept':'application/json, charset=utf-8'
      //}
    })
    console.log(data);
  }

  return <button onClick={clickFetch}> Get Fetch  </button>
}