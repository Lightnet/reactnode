/*
  LICENSE: MIT
  Created by: Lightnet
*/

import axios from "axios";
import { useEffect, useState } from "react";
import { parseJwt } from "../../lib/helper.mjs";
import { useAuth } from "../auth/AuthProvider";
export default function useAxiosTokenAPI(){
  //const [tokenJWT, setTokenJWT] = useState();//can't use as return promise
  const [tokenJWT, setTokenJWT] = useState({instance:null});
  const { 
    API_URL,
    token, setToken,
    expire, setExpire
  } = useAuth();

  useEffect(()=>{

    if(tokenJWT.instance){
      //console.log("CLEAR??")
      setTokenJWT({instance:null});
    }

    const instance = axios.create({
      baseURL: API_URL
      , headers: {
        //'X-Custom-Header': 'foobar'
        "Content-Type": "application/json"
      }
    });
    console.log(instance);

    instance.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      console.log(expire)
      if (expire * 1000 < currentDate.getTime()) {
        console.log("get update?")
        const response = await axios.get('/token');
        if(response.data.error){
          console.log("NOT LOGIN");
          setStatus('unauth');
          return config;
        }
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = parseJwt(response.data.accessToken);
        //setName(decoded.name);
        setExpire(decoded.exp);
      }else{
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
      }, (error) => {
        return Promise.reject(error);
      });
      setTokenJWT({instance:instance});
  
    return ()=>{
      setTokenJWT(null);
    }
  },[token, expire])
  return tokenJWT;
}