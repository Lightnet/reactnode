/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useEffect } from "react";
//import useFetch from "../hook/useFetch.mjs";
import { 
  parseJwt 
  //, isEmpty
} from "../../lib/helper.mjs";
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
  
  const [userID, setUserID] = useState(''); // use?
  const [user, setUser] = useState(''); // user name
  const [status, setStatus] = useState('loading'); //loading, auth, unauth

  //refresh token access
  const [token, setToken] = useState(''); // required access
  const [expire, setExpire] = useState('');
  //refresh token base access without keys but ip
  const [baseToken, setBaseToken] = useState(''); // required access
  const [baseExpire, setBaseExpire] = useState(0);

  useEffect(() => {
    refreshToken();
    refreshBaseToken();
  }, []);

  async function refreshToken(){
    setStatus('loading')
    axios.get('/token').then(function (response) {
      console.log(response)
      if(response.data.error){
        console.log("NOT LOGIN")
        setStatus('unauth')
        return;
      }
      const decoded = parseJwt(response.data.accessToken);
      //console.log(decoded)
      setToken(response.data.accessToken);
      setUser(decoded.user);
      setExpire(decoded.exp);
      console.log(decoded.exp);
      setStatus('auth')
    }).catch(function (error) {
      // handle error
      console.log(error);
      console.log("TOKEN ERROR...")
      setStatus('unauth')
      //history.push("/");
    })
  }

  async function refreshBaseToken(){
    axios.get('/basetoken').then(function (response) {
      console.log(response)
      const decoded = parseJwt(response.data.accessToken);
      console.log(decoded)
      setBaseToken(response.data.accessToken);
      setBaseExpire(decoded.exp);
      console.log(decoded.exp);
    }).catch(function (error) {
      // handle error
      console.log(error);
      console.log("BASE TOKEN ERROR...")
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

  const response = await axiosJWT.get('/refreshtest', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  */

  const value = useMemo(()=>({
    status, setStatus,
    userID, setUserID,
    user, setUser,
    token, setToken,
    expire, setExpire,
    baseToken, setBaseToken,
    baseExpire, setBaseExpire
  }),[
    status,
    userID,
    user,
    token,
    expire,
    baseToken,
    baseExpire
  ])

  return <AuthContext.Provider value={value} {...props} />
}