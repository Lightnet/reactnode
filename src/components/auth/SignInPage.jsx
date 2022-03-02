/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './AuthProvider.jsx';

export function SignInPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {setUser,setToken} = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  

  async function clickLogin(){
    //console.log("login")
    let data = await useFetch('/signin',{
      method:'POST',
      body:JSON.stringify({userName,password})
    })
    console.log(data)
    if(data.error){
      console.log('Fetch error Login');
      if(data.error=='PASSWORDFAIL'){
        setStatus('Password Fail!');
      }
      return;
    }
    if(data.action){

      if(data.action=='LOGIN'){
        setUser(data.user);
        setToken(data.token);
        navigate('/')
      }

      if(data.action=='NONEXIST'){
        //navigate('/')
        setStatus('Non Exist!');
      }
    }
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  function typingUser(e){
    setUserName(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <label>Login:{status}</label>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label> User: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input value={userName} onChange={typingUser}></input>
            </td>
          </tr>

          <tr>
            <td>
              <label> Password: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input value={password} onChange={typingPassword}></input>
            </td>
          </tr>

          <tr>
            <td>
              <button onClick={clickLogin}>Login</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </>);
}
