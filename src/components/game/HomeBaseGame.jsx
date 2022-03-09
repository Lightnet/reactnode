/*
  LICENSE: MIT
  Created by: Lightnet

  Home Base. Main Game. Entry point for page or route access.

*/

import React, { useEffect, useState } from 'react';
import { useGame } from './context/GameProvider.jsx';
import BaseOutPost from './outpost/baseoutpost.jsx';
import Map from './map/Map.jsx';
import Buildings  from './ui/homebase/Buildings.jsx';
import Construction from './ui/homebase/Construction.jsx'
import ResearchAndDevelopment from './ui/ResearchAndDevelopment.jsx'
import Storage from './item/Storage.jsx';
import Inventory from './item/Inventory.jsx';
import Characters from './character/Characters.jsx';
import Units from './unit/units.jsx';
import GameNavMenu from './ui/GameNavMenu.jsx';
import { Route, Routes } from 'react-router-dom';

export default function Base() {
  const {
    baseName,
    characterName
  }=useGame();

  return (<>
      <GameNavMenu/>
      <div style={{height:"calc(100% - 18px)"}}>
      <Routes>
        <Route index element={<BaseOutPost />}/>
        <Route path="map" element={<Map />}/>
        <Route path="baseoutpost" element={<BaseOutPost />}/>
        <Route path="Buildings" element={<Buildings />}/>
        <Route path="construction" element={<Construction />}/>
        <Route path="rad" element={<ResearchAndDevelopment />}/>
        <Route path="units" element={<Units />}/>
        <Route path="characters" element={<Characters />}/>
        <Route path="storage" element={<Storage />}/>
        <Route path="inventory" element={<Inventory />}/>
      </Routes>
      </div>
  </>);
}