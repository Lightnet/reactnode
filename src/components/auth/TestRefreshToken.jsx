/*
  LICENSE: MIT
  Created by: Lightnet
*/

import axios from "axios";
import React from "react";
import { parseJwt } from "../../lib/helper.mjs";
import { useAuth } from "./AuthProvider";

export default function TestRefreshToken(){
  const {
      token
    , setToken
    , expire
    , setExpire
  } = useAuth();

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

  async function clickRefreshTest(){
    const response = await axiosJWT.get('http://localhost:3000/refreshtest', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //setUsers(response.data);
    console.log(response.data)
  }

  return  <>
    <button onClick={clickRefreshTest}> Test Refresh Token </button>
  </>
}