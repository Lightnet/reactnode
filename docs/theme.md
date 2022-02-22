

globals.css
```css
:root {

/* test  */
  --test-color:red;
  --test-color2:red;
}
/*  TEST  */
.testcolor{
  color:var(--test-color);
}
.testcolor2{
  color:var(--test-color2);
}
```

```js
function colorChange1(){
  document.documentElement.style.setProperty('--test-color', 'blue');
}

function colorChange2(){
  document.documentElement.style.setProperty('--test-color', 'red');
}

//...
<button className="testcolor"> Test Color  </button><br/>
<button onClick={colorChange1}>set 1 Color1  </button><br/>
<button onClick={colorChange2}>set 1 Color2  </button><br/>
//...
<button className="testcolor2"> Test Color2  </button><br/>
```