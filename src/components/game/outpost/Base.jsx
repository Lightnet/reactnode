/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../GameProvider.jsx';
import useFetch from '../../hook/useFetch.mjs';
import BaseOutPost from './baseoutpost.jsx';
import Map from '../map/Map.jsx';
import Buildings  from '../building/Buildings.jsx';
import Construction from '../building/Construction.jsx'
import ResearchAndDevelopment from '../ResearchAndDevelopment.jsx'
import Storage from '../item/Storage.jsx';
import Inventory from '../item/Inventory.jsx';
import Characters from '../character/Characters.jsx';
import Units from '../unit/units.jsx';

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