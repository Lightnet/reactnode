/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DownloadProgress2Page from "../pages/downloadprogress2page.js";
import DownloadProgressPage from "../pages/downloadprogresspage.js";
import UploadPage2 from "../pages/uploadpage2.js";
import ProgressBarUI from "../progress/progressbarui.js";

export default function ProgressPage(){

  return (<>
    <div>
      <label>ProgressPage</label>
    </div>
    <ProgressBarUI /><br />
    <br />

    <UploadPage2 /><br />
    <br />

    <DownloadProgressPage /><br/>

    <DownloadProgress2Page />

  </>)
}