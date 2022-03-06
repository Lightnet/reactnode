
# code-editor
- https://github.com/uiwjs/react-textarea-code-editor
- https://uiwjs.github.io/react-textarea-code-editor/
- 
- https://codesandbox.io/s/react-syntax-highlighter-logrocket-tutorial-b3ejq?file=/components/Highlighter.js
- https://blog.logrocket.com/building-react-code-editor-syntax-highlighter/
- 





//tested
https://codesandbox.io/s/4rlw34mnk7
https://github.com/lovasoa/react-contenteditable





// https://draftjs.org/docs/getting-started

// https://jsfiddle.net/nrx9yvw9/5/   Set cursor position to 25 chars in
// https://www.geeksforgeeks.org/how-to-set-cursor-position-in-content-editable-element-using-javascript/

// https://clubmate.fi/make-any-html-element-editable
// https://javascript.plainenglish.io/editable-html-in-react-6dd67dd7e302
// https://www.taniarascia.com/content-editable-elements-in-javascript-react/
// https://markoskon.com/using-the-contenteditable-attribute/
// https://github.com/lovasoa/react-contenteditable/blob/master/src/react-contenteditable.tsx
// https://stackoverflow.com/questions/55812564/react-component-div-with-contenteditable-using-dangerouslysetinnerhtml-jumping
// 
// https://github.com/facebook/react/issues/2047
// https://www.codegrepper.com/code-examples/whatever/save+cursor+position+in+contenteditable+div
// https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
// https://stackoverflow.com/questions/45306325/react-contenteditable-and-cursor-position
// https://thewebdev.info/2021/05/01/how-to-set-the-cursor-position-on-contenteditable-div-with-javascript/
// 
// https://codesandbox.io/s/misty-microservice-efouz?file=/src/App.js //works
// https://gist.github.com/Schniz/e398a630c81cfd8a3d1e // work to select for current text
// 
// https://javascript.tutorialink.com/get-contenteditable-caret-index-position/
// https://quick-adviser.com/how-do-you-get-the-cursor-position-in-the-input-field/
// https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render/38548616#38548616
// 
// https://codepen.io/mlbrgl/pen/QQVMRP?editors=0010
// https://codepen.io/mlbrgl/pen/PQdLgb?editors=1010



```js
if(IsSelect){
  let el = contentEditableRef.current;
  let text = "";
  console.log(text);
  var sel = window.getSelection();
  var tempRange = sel.getRangeAt(0);
  sel.removeAllRanges();
  var range = document.createRange();
  range.selectNodeContents(el);
  console.log(range);
  sel.addRange(range);
  text = sel.toString();
  console.log(text)

  //text = sel.toString();
  sel.removeAllRanges();
  sel.addRange(tempRange);
  text = sel.toString();
  console.log(text);
}

```

```js
const moveCaretToEnd = () => {
  if(!contentEditableRef.current){
    return;
  }
  var el = contentEditableRef.current;
  const range = document.createRange();
  console.log("range")
  console.log(range)
  const sel = window.getSelection();
  console.log(el.childNodes)
  if(!el.childNodes){
    return;
  }
  let count_element = el.childNodes.length - 1;
  console.log(count_element)
  if(el.childNodes.length !=0){
    range.setStart(
      el.childNodes[count_element],
      el.childNodes[count_element].length || 1
    );
  }
  
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};
```