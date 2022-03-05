/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../lib/helper.mjs";
import { useAuth } from "./AuthProvider";

export default function AuthAccess({children}){

  const navigate = useNavigate();
  const { user } =useAuth();

  useEffect(()=>{
    if(isEmpty(user)){
      navigate('/signin');
    }
  },[user])

  if(isEmpty(user)){
    return <></>
  }
  
  return <>
    {children}
  </>
}