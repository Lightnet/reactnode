https://stackoverflow.com/questions/52820155/react-js-how-to-pass-event-handlers-to-deeply-nested-component-without-props-d

https://redux.js.org/tutorials/essentials/part-3-data-flow

- https://reactjs.org/

# Information:
  There are different way to create react.js components. One is the manual coding with out the compiler and other with the compiler.

- https://reactjs.org/docs/add-react-to-a-website.html
- https://javascript.info/modules-intro

index.html
```html
<script type="module" src="path/react.js"> </script>
<div id="app">
  <!-- This element's contents will be replaced with your component. -->
</div>
<script type="module" >
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('app')
  );
</script>
```
  Since the suport of the module it become easy.

index.html
```html
<script type="module" src="path/react.js"> </script>
<div id="app"></div>
<script type="module" src="bundle.js"></script>
```
  Another way is using the compiler from webpack, babel and react.

```js
const e = React.createElement;
// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

- https://reactjs.org/tutorial/tutorial.html

app.js
```js
//babel js
import React from "react";

export default class extends React.Component{

  render() {
    return(<>
      <label>Hello World</label>
    </>);
  }
}
```


```js
//babel.js
import React from "react";

export default function App(){

  return(<>
    <label>Hello World</label>
  </>)
}
```

# Tips / Design:


## array:
  The array is tricky depend which function type is used.
- https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate

```js
const[myarray, setMyArray ]= useState([])
```

```js
// add array
let textstr = "test"
//string array
setMyArray(state=>[...state,textstr])

//object array
let id = "00";
let value = "001";
setMyArray(state=>[...state,{id:id,value:value}])
```

```js
// remove array
let textstr = "test"
//string array
setMyArray(state.filter((item) => item != textstr));

//object array
setMyArray(state.filter((item) => item.id != id));
```







