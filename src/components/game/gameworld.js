/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from './gameprovider.js';
import useFetch from '../hook/useFetch.js';
import BaseCreate from './outpost/basecreate.js';
import Base from './outpost/base.js';

import { useNavigate } from "react-router-dom";

export default function GameWorld() {

  const {
    setBaseName,
    setBaseID,
    setCharacterID,
    setCharacterName,
  } = useGame();
  const navigate = useNavigate();
  const [isBase, setIsBase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( async()=>{
    await getBase();
  },[])

  async function getBase(){
    setIsLoading(true);
    let data = await useFetch('api/base');
    console.log(data)
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
  }

  function callBackOPS(args){
    if(args){
      if(args.action){
        if(args.action=='CREATEBASE'){
          setIsBase(true)
        }  
      }
    }
  }

  function renderCheckBase(){
    if(isBase){
      return <Base />
    }else{
      return <BaseCreate ops={callBackOPS} />
    }
  }

  if(isLoading){
    return <label>Loading...</label>
  }

  return (<>
    <div>
      {renderCheckBase()}
    </div>
  </>);
}
