/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/39589917/show-a-progress-bar-for-downloading-files-using-xhr2-ajax/39599878
// delay in popup if big file in browser

import React, { useState } from "react";

export default function DownloadProgress2Page(){
  const [percent, setPercent] = useState(0);
  //const [receivedLength, setReceivedLength] = useState(0);

  async function clickDownload(){
    setPercent(0);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.addEventListener("progress", function (evt) {
      if(evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
        console.log(percentComplete);
        setPercent(percentComplete*100);
      }
    }, false);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
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
      }
    };

      xhr.open('GET', '/downloadtest', true);
      xhr.send(); 



    /*
        //URL.createObjectURL(blob)
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `test.txt`,//need to file name correctly
        );
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        console.log("done?")
      */
  }

  return (<>
    <label> Download progress </label><br />
    <button onClick={clickDownload}> Download 3</button>
    <progress value={percent} max="100"/>
  </>)
}