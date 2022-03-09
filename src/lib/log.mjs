/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://gist.github.com/robatron/5681424
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
// https://stackoverflow.com/questions/20524700/custom-console-log-function-a-console-log-wrapper
// https://gist.github.com/robatron/5681424
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
// https://stackoverflow.com/questions/27791703/can-i-find-server-side-hard-drive-letter-using-node-js

import chalk from "chalk";
import path from "path";
//do not used on browser error
//const ISDEBUG = process.env.ISDEBUG || true;
var PROCESSDEBUG;
if(typeof process !== "undefined"){
  PROCESSDEBUG = process.env.ISDEBUG;
}
const ISDEBUG = PROCESSDEBUG || true;

export function log(...args){
  if(ISDEBUG){
    //console.log('[log]',...args);
    //console.log.apply(this, args);

    let e = new Error(args);
    let fullTrace = e.stack.split('\n');
    //console.log(fullTrace);
    for( var i = 0 ; i < fullTrace.length ; ++i ){
      fullTrace[i] = fullTrace[i].replace(/\s+/g, ' ');
    }
    //console.log(chalk.red("Full Trace"));
    //console.log(fullTrace);
    let caller = fullTrace[2], // file
                 callerParts = caller.split(':');
    //console.log("caller");
    //console.log(caller);
    if( callerParts.length >= 1 ){
      //console.log(callerParts[0])
      //console.log(callerParts[0].split(':'))
      //callerParts[0].split(':')[2]
      //console.log('Console log:', callerParts[1],"(Line:", callerParts[2],")"); //note it compile to .next folder
      //console.log(chalk.yellow('Console log:'), callerParts);
      //console.log(callerParts[0].indexOf("at http"))
      if(callerParts[0].indexOf("at http")==1){
        //browser client
        console.log(chalk.yellow('Console log:'), "http:"+callerParts[1]+callerParts[2]+":"+callerParts[3]+":"+callerParts[4] );
      }else{
        //node js
        //console.log(callerParts[1])
        //console.log(path.join(callerParts[1],callerParts[2]))
        if(typeof process !== "undefined"){
          const cwdOSRoot = path.parse(process.cwd()).root;
          let space = callerParts[4].replace(")" , " ")
          console.log(chalk.yellow('Console log:'), path.join(cwdOSRoot,callerParts[2])+":"+ callerParts[3]+":"+space );
        }
        //console.log(callerParts)
        //console.log(chalk.yellow('Console log>>:'), callerParts[2]+":"+callerParts[3]+":"+callerParts[4] );
      }
    }
    //console.log(fullTrace);
    //console.log(e.stack);
    //console.log(args); //nope
    console.log.apply(this,args); // ok
    //console.log.apply(console, args); // ok
  }
}