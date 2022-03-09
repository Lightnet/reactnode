/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameProvider.jsx';
import useFetch from '../../hook/useFetch.mjs';

export default function BaseOutPost() {

  const {
    baseName
  }=useGame();
  return <div>
    <label>Base Name:{baseName}</label>
  </div>
}