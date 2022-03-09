/*
  LICENSE: MIT
  Created by: Lightnet
*/

import axios from "axios";
import React from "react";
import { parseJwt } from "../../lib/helper.mjs";
import { useAuth } from "./AuthProvider";
import CryptoJS from "crypto-js";

export default function TestRefreshToken4(){
  const {
      API_URL
    , token
    , setToken
    , expire
    , setExpire
  } = useAuth();
  // https://stackoverflow.com/questions/48819885/axios-transformrequest-how-to-alter-json-payload
  const axiosJWT = axios.create({
    baseURL: API_URL
    , headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [(data, headers)=> {
      // Do whatever you want to transform the data
      console.log("headers",headers)
      console.log("transformRequest")
      console.log(data)
      data.password = CryptoJS.AES.encrypt(data.password, headers.Authorization.split(' ')[1]).toString();
      return data;
    }, ...axios.defaults.transformRequest]
  });

  axiosJWT.interceptors.request.use(async (config) => {
    //console.log("config:",config)
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('/token');
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

  function clickRefreshTest(){
    axiosJWT.post('/testlogin', {
        username:"test"
      , password:"passwordtest"
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return  <>
    <button onClick={clickRefreshTest}> Test Refresh Token 4 </button>
  </>
}