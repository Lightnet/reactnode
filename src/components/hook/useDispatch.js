/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import {useEffect } from 'react';

export default function useDispatch(event, data) {

  //useEffect(() => {
    window.dispatchEvent(new CustomEvent(event,data));
    //return ()=> {
    //}
  //});
}