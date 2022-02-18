/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/35711724/upload-progress-indicators-for-fetch
// https://javascript.info/fetch-progress
// https://christopher5106.github.io/web/2015/12/13/HTML5-file-image-upload-and-resizing-javascript-with-progress-bar.html
// https://developpaper.com/nodejs-file-upload-monitoring-upload-progress/
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event
// FETCH UPLOAD DOES NOT WORK ATM

import React, { useState } from "react";

export default function UploadPage2(){

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelectFile, setIsSelectFile] = useState(false);

  const [percent, setPercent] = useState(0);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelectFile(true);
	};

  async function clickUpload(){
    setPercent(0)
    const formData = new FormData();
    console.log(selectedFile)
    formData.append('myfiles', selectedFile);
    var xhr = new XMLHttpRequest();
    //Monitor file upload progress
    
    
    function onprogress(e) {
      //console.log("...")
      if (e.lengthComputable) {
        const _progress = Math.round((e.loaded * 100) / e.total);
        //console.log("progress:", e.loaded+  " / " + e.total)
        setPercent(_progress);
        console.log("progress:", _progress)
      }
    }
    
    function onloadstart(e) {
      console.log("start upload")
    }
    function onload(){
      console.log ('upload complete ')
    }
    
    xhr.upload.addEventListener('progress',onprogress, false)
    xhr.addEventListener('loadstart',onloadstart,false)
    xhr.addEventListener('load',onload , false);
    
    let url = "/upload";
    xhr.open("POST", url);
    xhr.send(formData);
  }

  return (<>
    <label> Upload progress test! </label>
    <input type="file" name="file" onChange={changeHandler}/><progress value={percent} max="100"/>
    <button onClick={clickUpload}> Upload 2 </button>
    {isSelectFile ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
    
  </>)
}