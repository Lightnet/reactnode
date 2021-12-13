/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { GameProvider } from './gameprovider.js';
import { GameWorld } from './gameworld.js';

export function GamePage() {

  return (<>
    <GameProvider>
      <GameWorld></GameWorld>
    </GameProvider>
  </>);
}
