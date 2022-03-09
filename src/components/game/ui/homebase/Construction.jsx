/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../../../lib/API.mjs';
import { getConstruction } from '../../../../lib/game/construction.js';
import useAxiosTokenAPI from '../../../hook/useAxiosTokenAPI.jsx';
import useFetch from '../../../hook/useFetch.mjs';
import { useGame } from '../../context/GameProvider.jsx';

export default function Construction() {

  const [buildings, setBuildings] = useState([]);
  const [axiosJWT] = useAxiosTokenAPI();

  useEffect(() => {
    getHomeBaseObjects();
    //console.log(getConstruction())
    setBuildings(getConstruction())
    return () => {
    }
  },[])


  async function getHomeBaseObjects(){

  }

  async function buildBuiilding(item){
    console.log(item)
    axiosJWT.instance.post('/api/building',{
      api:API.TYPES.CREATE
      , building:item
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('axiosJWT Error!');
          return;
        }
    
        if(data.api=='UPDATE'){
    
        }
      }
    })
  }

  return <div>
    <div>
      <label>Constructions:</label>
      </div>
      <div>
        {buildings.map((item,i)=>{
          //console.log(item);
          //console.log(i);
          return (<div key={i}><label>Name:{item.name}</label><button onClick={()=>buildBuiilding(item)}> Create </button>  </div>);
          //return (<label>Name:{item.name}</label>);
        })}
      </div>
  </div>
}