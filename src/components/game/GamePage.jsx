/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { GameProvider } from './context/GameProvider.jsx';
import EntryPointGame from './EntryPointGame.jsx';

export function GamePage() {

  return (<>
    <GameProvider>
      <EntryPointGame/>
    </GameProvider>
  </>);
}
