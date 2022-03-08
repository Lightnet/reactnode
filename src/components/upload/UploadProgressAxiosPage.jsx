/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
// 
// 
// 
// FETCH UPLOAD DOES NOT WORK ATM

import axios from "axios";
import React, { useState } from "react";

export default function UploadProgressAxiosPage(){

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [status, setStatus] = useState("idle");
  const [percent, setPercent] = useState(0);

  const [controller, setController] = useState(null);
  const [isAbort, setIsAbort] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelectFile(true);
    setStatus("Ready!")
	};

  function clickAbort(){
    // cancel the request
    if(controller){
      controller.abort()
      setIsAbort(false);
    }
  }

  async function clickUpload(){
    setPercent(0)
    
    console.log(selectedFile)
    if(!selectedFile){
      console.log("FILE EMPTY!");
      setStatus("File Empty!")
      return;
    }
    setStatus("Download")
    setIsAbort(true);
    
    const formData = new FormData();
    formData.append('myfiles', selectedFile);
    const control = new AbortController();
    setController(control);

    const config = {
      signal: control.signal
      , onUploadProgress: function(progressEvent) {
        var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total
        //console.log(percentCompleted)
        setPercent(percentCompleted);
        setStatus(percentCompleted.toFixed(2)+"%")
      }
    }

    axios.post("/upload", formData, config)
      .then(res => {
        console.log(res)
        setStatus("Finish Upload!")
        setIsAbort(false);
      })
      .catch(err => {
        console.log(err)
        setStatus(err.message)
        setIsAbort(false);
        //setStatus("Error Upload!")
      })
  }

  return (<>
    <label> Upload progress test! </label>
    <input type="file" name="file" onChange={changeHandler}/><progress value={percent} max="100"/>
    <button onClick={clickUpload}> Upload Axios </button><label>{status}</label>
    {isAbort && <button onClick={clickAbort}> Abort! </button>}
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