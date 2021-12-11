/*
  Created by: Lightnet
*/

import React, { useState } from 'react';

import {
  useNavigate
} from "react-router-dom";

export function SignInPage() {
  //const [view, setView] = useState('');
  const navigate = useNavigate()

  function clickLogin(){
    console.log("login")
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  return (<>
    <label>Sign In</label>
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
              <input></input>
            </td>
          </tr>


          <tr>
            <td>
              <label> Password: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input></input>
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
