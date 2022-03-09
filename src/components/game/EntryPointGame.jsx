/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Check for user has base or not.
*/

import React, { useEffect, useState } from 'react';
import { useGame } from './context/GameProvider.jsx';
import BaseCreate from './outpost/BaseCreate.jsx';
import HomeBaseGame from './HomeBaseGame.jsx';

import { useNavigate } from "react-router-dom";
import useAxiosTokenAPI from '../hook/useAxiosTokenAPI.jsx';

export default function EntryPointGame() {

  const {
    setBaseName,
    setBaseID,
    setCharacterID,
    setCharacterName,
  } = useGame();
  const navigate = useNavigate();
  const [isBase, setIsBase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [axiosJWT, isJSTLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("axiosJWT init...");
    //console.log("isLoading: ", isJSTLoading)
    if((typeof axiosJWT?.instance=="function")&&(isJSTLoading == false)){
      console.log("GETTING...: ")
      getBase();
    }
  },[axiosJWT,isJSTLoading])

  async function getBase(){
    axiosJWT.instance.get("/api/base")
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error Base!');
          setIsLoading(false);
          navigate('/signin');
          return;
        }
    
        if(data.api=='BASE'){
          setBaseName(data.base.name);
          setBaseID(data.base.id);
    
          setCharacterName(data.character.name);
          setCharacterID(data.character.id);
    
          setIsBase(true);
          setIsLoading(false);
        }

        if(data.api=='NOBASE'){
          setIsBase(false);
          setIsLoading(false);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function callBackOPS(args){
    if(args){
      if(args.api){
        if(args.api=='CREATEBASE'){
          setIsBase(true)
        }  
      }
    }
  }

  function renderCheckBase(){
    if(isBase){
      return <HomeBaseGame />
    }else{
      return <BaseCreate ops={callBackOPS} />
    }
  }

  if(isLoading){
    return <label>Loading...</label>
  }

  return (<>
    <div style={{height:"calc(100% - 18px)"}}>
      {renderCheckBase()}
    </div>
  </>);
}
