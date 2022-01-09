/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../gameprovider.js';
import useFetch from '../../hook/useFetch.js';
import { isEmpty } from '../../../lib/helper.mjs';

export default function BaseCreate({ops}) {

  const [ baseName, setBaseName0] = useState('');
  const [ characterName, setCharacterName0] = useState('');
  const {
    setBaseName,
    setBaseID,
    setCharacterID,
    setCharacterName
  }=useGame();

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
    let data = await useFetch('api/baseoutpost',{
      method:'POST',
      body:JSON.stringify({
        action:'CREATEMAINBASE',
        basename:baseName,
        charactername:characterName
      })
    })
    if(data.error){
      console.log(data.error);
      console.log('Fetch Error Create Base')
      return;
    }

    if(data.action){
      if(data.action=='CREATE'){
        console.log(data);
        setBaseName(data.base.name);
        setBaseID(data.base.id);

        setCharacterID(data.character.id);
        setCharacterName(data.character.name);

        if(typeof ops !== 'undefined'){
          ops({action:'CREATEBASE'})
        }
      }
    }
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