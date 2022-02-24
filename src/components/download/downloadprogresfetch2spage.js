/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codesandbox.io/s/fetch-based-file-download-0kxod
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
// delay in popup if big file in browser

import React, { useState } from "react";

export default function DownloadProgressFetch2Page(){
  const [percent, setPercent] = useState(0);
  //const [receivedLength, setReceivedLength] = useState(0);
  const [status, setStatus] = useState("idle");

  async function clickDownload(){
    setPercent(0);
    setStatus("download...")
    fetch("/downloadtest")
      // Retrieve its body as ReadableStream
      .then(response => {
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        //console.log(contentLength);
        let receivedLength = 0;
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                //console.log("....")
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }
                //console.log(value)
                receivedLength += value.length;
                let _percent = (receivedLength/contentLength)*100;
                setPercent( _percent );
                setStatus( _percent.toFixed(2) + "%" )
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })

      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => {
        //URL.createObjectURL(blob)
        setStatus("Finish download...")
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
      })
      .catch(err =>{
        setStatus("Error download!")
        console.error(err)
      });
  }

  return (<>
    <button onClick={clickDownload}> Download Fetch 2</button>
    <progress value={percent} max="100"/><label>{status}</label>
  </>)
}