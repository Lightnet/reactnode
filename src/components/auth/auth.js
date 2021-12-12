/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useEffect } from "react";
import useFetch from "../hook/useFetch.js";

export const AuthContext = createContext();

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a UserContext`)
  }
  return context;
}

export function AuthProvider(props){
  const [token, setToken] = useState('');
  const [userID, setUserID] = useState('');
  const [user, setUser] = useState('');
  const [session, setSession] = useState('');
  //const [status, setStatus] = useState('unauth'); //loading, auth, unauth

  //safe?
  useEffect(async()=>{
    let data = await useFetch('/session');
    if(data.error){
      console.log('Fetch Error Session!');
      return;
    }
    if(data.token){
      setToken(data.token);
      setUser(data.user);
    }
  },[])

  const value = useMemo(()=>({
    token, setToken,
    userID, setUserID,
    user, setUser,
    session, setSession,
  }),[
    token,
    userID,
    user,
    session
  ])

  return <AuthContext.Provider value={value} {...props} />
}