/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { Link } from "react-router-dom";

export default function GameNavMenu(){
  return <div>
    <Link to="map"> Map </Link><span> | </span>
    <Link to="battle"> Battle </Link><span> | </span>
    <Link to="baseoutpost"> Home Base </Link><span> | </span>
    <Link to="buildings"> Buildings </Link><span> | </span>
    <Link to="construction"> Construction </Link><span> | </span>
    <Link to="units"> Units </Link><span> | </span>
    <Link to="rad"> R&D </Link><span> | </span>
    <Link to="characters"> Characters </Link><span> | </span>
    <Link to="storage"> Storage </Link><span> | </span>
    <Link to="inventory"> Inventory </Link><span> | </span>
  </div>
}