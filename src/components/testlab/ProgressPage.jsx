/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DownloadProgressFetchPage from "../download/DownloadProgressFetchPage.jsx";
import DownloadProgressAxiosPage from "../download/DownloadProgressAxiosPage.jsx";
import DownloadProgressXHRPage from "../download/DownloadProgressXHRPage.jsx";
import ProgressBarUI from "../progress/ProgressBarUI.jsx";
import UploadProgressAxiosPage from "../upload/UploadProgressAxiosPage.jsx";
import UploadProgressXHRPage from "../upload/UploadProgressXHRPage.jsx";

export default function ProgressPage(){

  return (<>
    <div>
      <label>ProgressPage</label>
    </div>
    <ProgressBarUI /><br />
    <br />
    <UploadProgressXHRPage /><br />
    <br />
    <UploadProgressAxiosPage/><br />
    <br />
    <DownloadProgressFetchPage /> <br/>
    <br/>
    <DownloadProgressXHRPage /><br/>
    <br/>
    <DownloadProgressAxiosPage/>
  </>)
}