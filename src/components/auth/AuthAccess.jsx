/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { isEmpty } from "../../lib/helper.mjs";
import { useAuth } from "./AuthProvider";

export default function AuthAccess({children}){

  const navigate = useNavigate();
  const { user, status } =useAuth();

  useEffect(()=>{
    if(status=="loading"){
      return;
    }
    if(status=="unauth"){
      navigate('/signin');
    }
  },[status])

  if(status=="loading"){
    return <></>
  }
  
  return <>
    {children}
  </>
}