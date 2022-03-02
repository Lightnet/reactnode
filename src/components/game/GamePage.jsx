/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { GameProvider } from './GameProvider.jsx';
import GameWorld from './GameWorld.jsx';

export function GamePage() {

  return (<>
    <GameProvider>
      <GameWorld></GameWorld>
    </GameProvider>
  </>);
}
