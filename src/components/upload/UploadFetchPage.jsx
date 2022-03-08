/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/35711724/upload-progress-indicators-for-fetch
// https://usefulangle.com/post/321/javascript-fetch-upload-progress
// https://jakearchibald.com/2016/streams-ftw/
// https://dev.to/tqbit/how-to-monitor-the-progress-of-a-javascript-fetch-request-and-cancel-it-on-demand-107f
// https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
// 
// 

import React, { useState } from "react";

export default function UploadFetchPage(){

  const [status, setStatus] = useState("idle");

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelectFile, setIsSelectFile] = useState(false);

  const [controller, setController] = useState(null);
  const [isAbort, setIsAbort] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelectFile(true);
    setStatus("Ready!");
	};

  function clickAbort(){
    // cancel the request
    if(controller){
      controller.abort()
      setIsAbort(false);
    }
  }

  function clickUpload(){
    console.log(selectedFile)
    if(!selectedFile){
      console.log("Empty File!")
      setStatus("Empty File!");
      return;
    }
    setStatus("Uploading...!");
    setIsAbort(true);
    const control = new AbortController();
    setController(control);

    const formData = new FormData();
    formData.append('myfiles', selectedFile);
    fetch('/upload',
			{
        signal:control.signal,
				method: 'POST',
				body: formData,
			}
		)
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
      setStatus("Finish!");
      setIsAbort(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setStatus(error.message);
      setIsAbort(false);
    });
  }

  return (<>
    <label> Page! </label>
    <input type="file" name="file" onChange={changeHandler}/>
    <button onClick={clickUpload}> Fetch Upload </button>
    <label> Status: {status} </label>
    {isAbort && <button onClick={clickAbort}> Abort! </button>}
    {isSelectFile ? (
				<div>
					<p>Filename: {selectedFile?.name}</p>
					<p>Filetype: {selectedFile?.type}</p>
					<p>Size in bytes: {selectedFile?.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile?.lastModifiedDate?.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
  </>)
}