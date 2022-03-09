/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameProvider.jsx';
import useFetch from '../../hook/useFetch.mjs';
import { isEmpty } from '../../../lib/helper.mjs';
import useAxiosTokenAPI from '../../hook/useAxiosTokenAPI.jsx';
import { API } from '../../../lib/API.mjs';

export default function BaseCreate({ops}) {

  const [ baseName, setBaseName0] = useState('');
  const [ characterName, setCharacterName0] = useState('');
  const {
    setBaseName,
    setBaseID,
    setCharacterID,
    setCharacterName
  }=useGame();

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  function typingBaseName(e){
    setBaseName0(e.target.value);
  }

  function typingCharacterName(e){
    setCharacterName0(e.target.value);
  }

  async function clickCreate(){

    if(isEmpty(baseName)|| isEmpty(characterName)){
      console.log('Input Empty!');
      return;
    }

    axiosJWT.instance.post("api/baseoutpost",{
        api:API.GAME.CREATEMAINBASE
        , basename:baseName
        , charactername:characterName
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log(data.error);
          console.log('Fetch Error Create Base')
          return;
        }
    
        if(data.api=='CREATE'){
          console.log(data);
          setBaseName(data.base.name);
          setBaseID(data.base.id);
  
          setCharacterID(data.character.id);
          setCharacterName(data.character.name);
  
          if(typeof ops !== 'undefined'){
            ops({api:'CREATEBASE'})
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (<>
    <div>
      <div>
        <label>Create Base</label><br />
      </div>
      <div>
        <label>Character Name:</label><br />
        <input value={characterName} onChange={typingCharacterName}></input>
      </div>
      <div>
        <label>Base Name:</label><br />
        <input value={baseName} onChange={typingBaseName}></input>
      </div>

      <div>
        <button onClick={clickCreate}>Create</button>
        
      </div>
    </div>
  </>);
}