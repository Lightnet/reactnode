/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.js";

export function SignUpPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function clickRegister(){
    let data = await useFetch('/signup',{
      method:'POST',
      body:JSON.stringify({user,password})
    })
    console.log(data)
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  function typingUser(e){
    setUser(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <label>Sign Up</label>
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
              <input value={user} onChange={typingUser}></input>
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
              <button onClick={clickRegister}>Register</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </>);
}