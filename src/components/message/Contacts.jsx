/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch.mjs';

export default function Contacts() {

  useEffect(()=>{
    getContacts();
  },[])

  async function getContacts(){
    let data = await useFetch("/api/contact")
    console.log(data);
  }

  function renderContacts(){



    return <></>
  }

  return <div>
    <div>
      <label>contacts:</label>
    </div>
    <div>

    </div>
  </div>
}