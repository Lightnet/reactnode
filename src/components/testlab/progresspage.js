/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DownloadProgressFetch2Page from "../download/downloadprogresfetch2spage.js";
import DownloadProgressAxiosPage from "../download/downloadprogressaxiospage.js";
import DownloadProgressXHRPage from "../download/downloadprogressxhrpage.js";
import ProgressBarUI from "../progress/progressbarui.js";
import UploadProgressAxiosPage from "../upload/uploadprogressaxiospage.js";
import UploadProgressXHRPage from "../upload/uploadprogressxhrpage.js";

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
    <DownloadProgressFetch2Page /> <br/>
    <br/>
    <DownloadProgressXHRPage /><br/>
    <br/>
    <DownloadProgressAxiosPage/>
  </>)
}