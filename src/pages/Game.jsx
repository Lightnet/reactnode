/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import AuthAccess from "../components/auth/AuthAccess";
import { GamePage } from "../components/game/GamePage";

export default function Game() {

  return (<>
    <AuthAccess>
      <GamePage/>
    </AuthAccess>
  </>)
}