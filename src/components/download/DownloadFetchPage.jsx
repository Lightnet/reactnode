/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codesandbox.io/s/fetch-based-file-download-0kxod

import React from "react";

export default function DownloadFetchPage(){

  function clickDownload(){
    fetch("/downloadtest")
      .then(response=>response.blob())
      .then(blob=>{
        
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `test.txt`,
        );
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
  }

  return (<>
    <label> Download Page! </label><br />
    <button onClick={clickDownload}> Download </button>
  </>)
}