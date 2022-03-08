/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.npmjs.com/package/crypto-js

import React from "react";
import CryptoJS from "crypto-js";

export default function TestCryptoButton(){

  function clickCryptoTest(){
    console.log(CryptoJS.HmacSHA1("Message", "Key"));

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    console.log(ciphertext);

    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText); // 'my message'
  }

  return <button onClick={clickCryptoTest}> Crypto Test </button>
}