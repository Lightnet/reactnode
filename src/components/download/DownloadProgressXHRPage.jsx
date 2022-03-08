/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/39589917/show-a-progress-bar-for-downloading-files-using-xhr2-ajax/39599878
// https://stackoverflow.com/questions/76976/how-to-get-progress-from-xmlhttprequest
// https://developpaper.com/a-code-of-downloading-progress-bar-and-playing-progress-bar-in-js/
// https://usefulangle.com/post/68/javascript-ajax-download-file
// 
// delay in popup if big file in browser

import React, { useState } from "react";

export default function DownloadProgressXHRPage(){
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("idle");
  const [isAbort, setIsAbort] = useState(false);
  const [controller, setController] = useState(null);

  function clickAbort(){
    // cancel the request
    if(controller){
      controller.abort()
      setIsAbort(false);
    }
  }

  async function clickDownload(){
    setPercent(0);

    setIsAbort(true)
    setStatus("Downloading...")
    const xhr = new XMLHttpRequest();
    setController(xhr);
    xhr.responseType = "blob";

    xhr.onprogress = function(evt){
      if(evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) *100;
        //console.log(percentComplete);
        setPercent(percentComplete);
        setStatus(percentComplete.toFixed(2)+"%")
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setStatus("Finish Download...")
        setIsAbort(false);
        //var filename = $(that).data('filename');
        var filename = "test01.txt";
        if (typeof window.chrome !== 'undefined') {
          // Chrome version
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(xhr.response);
          link.download = filename;
          link.click();
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE version
          var blob = new Blob([xhr.response], { type: 'application/force-download' });
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // Firefox version
          var file = new File([xhr.response], filename, { type: 'application/force-download' });
          window.open(URL.createObjectURL(file));
        }
        return;
      }
    };
    xhr.open('GET', '/downloadtest', true);
    xhr.send(); 
  }

  return (<>
    <button onClick={clickDownload}> Download XHR</button>
    <progress value={percent} max="100"/><label>{status}</label>
    {isAbort && <button onClick={clickAbort}> Abort! </button>}
  </>)
}