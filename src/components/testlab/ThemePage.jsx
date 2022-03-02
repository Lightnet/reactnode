/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.smashingmagazine.com/2020/08/application-color-schemes-css-custom-properties/
// https://www.codegrepper.com/code-examples/javascript/change+root+color+js
// https://stackoverflow.com/questions/37801882/how-to-change-css-root-color-variables-in-javascript
import React from "react";
// document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');

export default function ThemePage(){

  function colorChange1(){
    document.documentElement.style.setProperty('--test-color', 'blue');
  }

  function colorChange2(){
    document.documentElement.style.setProperty('--test-color', 'red');
  }

  function colorChange3(){
    document.documentElement.style.setProperty('--test-color2', 'green');
  }

  function colorChange4(){
    document.documentElement.style.setProperty('--test-color2', 'red');
  }

  return (<>
    <div>
      <label>UI PAGE</label><br/>
      <button className="testcolor"> Test Color  </button><br/>
      

      <button onClick={colorChange1}>set 1 Color1  </button><br/>
      <button onClick={colorChange2}>set 1 Color2  </button><br/>

      <button className="testcolor2"> Test Color2  </button><br/>

      <button onClick={colorChange3}>set 2 Color1  </button><br/>
      <button onClick={colorChange4}>set 2 Color2  </button><br/>

    </div>
  </>)
}