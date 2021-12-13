/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useEffect } from "react";
import { isEmpty } from "../../lib/helper.mjs";

export const GameContext = createContext();

export function useGame(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useGame must be used within a UserContext`)
  }
  return context;
}

export function GameProvider(props){
  const [token, setToken] = useState(''); // required access
  const [user, setUser] = useState(''); // user name
  const [status, setStatus] = useState('unauth'); //loading, auth, unauth

  const [characterID, setCharacterID] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [baseName, setBaseName] = useState('');
  const [baseID, setBaseID] = useState('');

  useEffect(()=>{
    if(!isEmpty(token)){
      console.log("TOKEN")
      setStatus('auth')
    }else{
      setStatus('unauth')
    }
  },[token])

  const value = useMemo(()=>({
    token, setToken,
    user, setUser,
    status, setStatus
  }),[
    token,
    user,
    status
  ])

  return <GameContext.Provider value={value} {...props} />
}