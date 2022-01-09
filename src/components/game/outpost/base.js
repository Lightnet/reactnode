/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../gameprovider.js';
import useFetch from '../../hook/useFetch.js';
import BaseOutPost from './baseoutpost.js';
import Map from '../map/map.js';
import Buildings  from '../building/buildings.js';
import Construction from '../building/construction.js'
import ResearchAndDevelopment from '../researchanddevelopment.js'
import Storage from '../item/storage.js';
import Inventory from '../item/inventory.js';
import Characters from '../character/characters.js';
import Units from '../unit/units.js';

export default function Base() {
  const {
    baseName,
    characterName
  }=useGame();

  const [view, setView] = useState('baseoutpost');

  function renderView(){

    if(view=='map'){
      return <Map />
    }
    if(view=='baseoutpost'){
      return <BaseOutPost />
    }
    if(view=='buildings'){
      return <Buildings />
    }
    if(view=='construction'){
      return <Construction />
    }
    if(view=='r&d'){
      return <ResearchAndDevelopment />
    }

    if(view=='units'){
      return <Units />
    }

    if(view=='characters'){
      return <Characters />
    }

    if(view=='storage'){
      return <Storage />
    }
    if(view=='inventory'){
      return <Inventory />
    }

    return <></>
  }

  function selectView(name){
    setView(name);
  }
  //<label>Base Name: {baseName} Charactor Name:{characterName}</label><br />
  return (<>
    <div>
      <div>
        <a href='#' onClick={()=>selectView('map')}>Map</a> <span> | </span>
        <a href='#' onClick={()=>selectView('baseoutpost')}>Base</a> <span> | </span>
        <a href='#' onClick={()=>selectView('buildings')}>Buildings</a> <span> | </span>
        <a href='#' onClick={()=>selectView('construction')}>Construction</a> <span> | </span>
        <a href='#' onClick={()=>selectView('units')}>Units</a> <span> | </span>
        <a href='#' onClick={()=>selectView('r&d')}>R&D</a> <span> | </span>

        <a href='#' onClick={()=>selectView('characters')}>Characters</a> <span> | </span>
        <a href='#' onClick={()=>selectView('storage')}>Storage</a> <span> | </span>
        <a href='#' onClick={()=>selectView('inventory')}>Inventory</a> <span> | </span>
        
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  </>);
}
/*
  <label>Content</label><br />
 */