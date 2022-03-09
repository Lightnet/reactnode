/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import useAxiosTokenAPI from '../../../hook/useAxiosTokenAPI.jsx';
//import { useGame } from '../../context/GameProvider.jsx';
import useFetch from '../../../hook/useFetch.mjs';
import TimeBuild from '../TimeBuild.jsx';

export default function Buildings() {

  const [buildings, setBuildings] = useState([]);

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      getHomeBaseObjects();
    }
  },[axiosJWT,isLoading])

  async function getHomeBaseObjects(){
    //console.log("get buildings...")
    axiosJWT.instance.get("/api/building")
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error GET Buildings');
          return;
        }
        if(data.api='BUILDINGS'){
          console.log(data.buildings);
          setBuildings(data.buildings);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function clickBuild(id){
    axiosJWT.instance.put("/api/building",{
        id:id
      , mode:'BUILD'
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error Build Time');
        }
        if(data.api){
          if(data.api=='BUILDTIME'){
            console.log(data);
            setBuildings(buildings.map(item=>{
              if(item.id == id){
                //item.mode='BUILD'
                //item.buildtime=data.time
                return {...item,buildtime:data.time,mode:'BUILD'};
              }
              return item;
            }))
          }
          if(data.api=='BUILDFINISH'){
            console.log(data);
            setBuildings(buildings.map(item=>{
              if(item.id == id){
                item.mode='idle'
                item.buildtime=data.time
                return item;
              }else{
                return item;
              }
            }))
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function clickStart(id){

  }

  function queryRender(item){
    if((item.buildtime > 1) &&(item.mode == 'idle')) {
      return <button onClick={()=>clickBuild(item.id)}>Build</button>
    }else if((item.buildtime > 1) &&(item.mode == 'BUILD')){
      return (
      <>
      <button onClick={()=>clickBuild(item.id)}>Check Build Time</button> 
      <TimeBuild timedate={item.buildtime}></TimeBuild>
      </>)
    }else{
      return <button onClick={clickStart}>Start</button>
    }
  }

  return <div>
    <div>
        <label>Buildings</label>
      </div>
      <div>
        {buildings.map(item=>{
          return (<div key={item.id}>
             <label>Name:{item.name}</label> <label>Mode:{item.mode}</label>
            {queryRender(item)}
            </div>)
        })}
      </div>
  </div>
}