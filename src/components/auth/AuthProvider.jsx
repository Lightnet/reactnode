/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useEffect } from "react";
//import useFetch from "../hook/useFetch.mjs";
import { isEmpty, parseJwt } from "../../lib/helper.mjs";
import axios from "axios";

export const AuthContext = createContext();

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthContext`)
  }
  return context;
}

export function AuthProvider(props){
  const [token, setToken] = useState(''); // required access
  const [userID, setUserID] = useState(''); // use?
  const [user, setUser] = useState(''); // user name
  const [session, setSession] = useState(''); // use?
  const [status, setStatus] = useState('loading'); //loading, auth, unauth

  const [expire, setExpire] = useState('');

  useEffect(() => {
    refreshToken();
  }, []);

  async function refreshToken(){
    setStatus('loading')
    axios.get('/token').then(function (response) {
      //console.log(response)
      const decoded = parseJwt(response.data.accessToken);
      //console.log(decoded)
      setToken(response.data.accessToken);
      setUser(decoded.user);
      setExpire(decoded.exp);
      setStatus('auth')
    }).catch(function (error) {
      // handle error
      console.log(error);
      console.log("TOKEN ERROR...")
      setStatus('unauth')
      //history.push("/");
    })
  }

  /*
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:3000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = parseJwt(response.data.accessToken);
        //setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });
  */

  const value = useMemo(()=>({
    token, setToken,
    userID, setUserID,
    user, setUser,
    session, setSession,
    status, setStatus,
    expire, setExpire
  }),[
    token,
    userID,
    user,
    session,
    status,
    expire
  ])

  return <AuthContext.Provider value={value} {...props} />
}