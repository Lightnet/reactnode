/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useState } from "react";

export default function UploadPage(){

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelectFile, setIsSelectFile] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelectFile(true);
	};

  function clickUpload(){
    const formData = new FormData();
    console.log(selectedFile)
    formData.append('myfiles', selectedFile);
    fetch('/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  return (<>
    <label> Page! </label>
    <input type="file" name="file" onChange={changeHandler}/>
    <button onClick={clickUpload}> Upload </button>
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