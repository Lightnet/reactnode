/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#download-progress
// https://towardsdev.com/what-is-better-for-http-requests-fetch-or-axios-comparison-920ceffc5161
// https://www.npmjs.com/package/axios
// https://joshtronic.com/2021/12/19/downloading-files-in-nodejs-with-axios/
// https://www.taogenjia.com/2021/06/17/Download-File-Streams-with-Axios/
// https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
// 
// delay in popup if big file in browser

/*
const controller = new AbortController();
axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});

*/


import axios from "axios";
import React, { useState } from "react";

export default function DownloadProgressAxiosPage(){
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("idle");

  async function clickDownload(){
    setPercent(0);
    let url = '/downloadtest'; 
    axios
      .get(url, { 
        responseType: "blob"
        , onDownloadProgress: function (progressEvent) {
          var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total
          //console.log(percentCompleted)
          setPercent(percentCompleted);
          setStatus(percentCompleted.toFixed(2)+"%")
        }
      })
      .then((response)=> {
        let filename = "tyes.txt";
        setStatus("Download Finish!")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        //document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        //link.remove();
        //const reader = new window.FileReader();
        //reader.readAsDataURL(response.data);
        //reader.onload = () => {
          //console.log("loaded...");
          //document.getElementById("img").setAttribute("src", reader.result);
        //};
      })
      .catch(function (error) {
        setStatus("Download Error!")
        console.log(error);
      });
  }

  return (<>
    <button onClick={clickDownload}> Download Axios</button>
    <progress value={percent} max="100"/> <label>{status}</label>
  </>)
}