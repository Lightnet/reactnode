
short function init
```js
(async()=>{
  console.log("init!")
})();
```

https://stackoverflow.com/questions/67914096/javascript-how-to-initialized-a-async-await-function-into-a-variable
https://flaviocopes.com/how-to-return-result-asynchronous-function/

```js
export default function AceEditor(props){

  const [Ace, SetAce] = useState(null);

  useEffect( async()=>{
    if (typeof window !== 'undefined') {
      const ReactAce = await import("react-ace"); //load this in order
      //await import("ace-builds/src-noconflict/mode-java");
      //await import("ace-builds/src-noconflict/mode-javascript");
      await import("ace-builds/src-noconflict/mode-jsx"); //load this in order
      await import("ace-builds/src-noconflict/theme-github"); //load this in order
      SetAce(ReactAce) // no error when the module is added together.
    }
  },[])

  if(Ace){
    //console.log(Ace)
    const AceComp = Ace.default;
    return <AceComp {...props}/>
  }
  return null;
}

```
  It has to wait for it to load to able to used default.
  One reason is the ssr render on server side that window null.