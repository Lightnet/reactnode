/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react"

export default function ColorPalettesPage(){

  const [color, setColor] = useState("#000000")

  function onChangeColor(e){
    setColor(e.target.value)
  }

  return (<>
    <input type={"color"} value={color} onChange={onChangeColor}/>
  
  </>)
}