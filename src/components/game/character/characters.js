/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../gameprovider.js';
import useFetch from '../../hook/useFetch.js';

export default function Characters() {

  const {
    characterName
  }=useGame();

  return <div>
    <label> (Main) Character Name:{characterName}</label> <br />
    <label>Characters</label>
  </div>
}