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

  const [percent, setPercent] = useState(0);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelectFile(true);
	};

  async function clickUpload(){
    setPercent(0)
    
    console.log(selectedFile)
    if(!selectedFile){
      console.log("FILE EMPTY!");
      return;
    }
    
    const formData = new FormData();
    formData.append('myfiles', selectedFile);

    const config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
        setPercent(percentCompleted);
      }
    }

    axios.post("/upload", formData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (<>
    <label> Upload progress test! </label>
    <input type="file" name="file" onChange={changeHandler}/><progress value={percent} max="100"/>
    <button onClick={clickUpload}> Upload Axios </button>
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