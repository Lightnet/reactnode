# React Node

# LICENSE: MIT

# Create by: Lightnet

# status:
- Prototyping
- Testing components.

# Pacakges:
- express
- @babel/preset-env
- @babel/preset-react
- npm-run-all
- webpack
- react
- nodemon
- jsonwebtoken
- dayjs
- nanoid
- vite

# Information:
  This is testing project. 
  
  To develop modular react ui, components and api. Justing the using the webpack, babel, express web server and other packages to keep it simple.

  Design for web page to tests api by using fetch call and api since it bundle into single javascript. By using the react dom router for account access, api logic type call, and other things for testing. Without need to reload the url pages to save bandwidth and keep it simple call from fetch url. Plus it reduce the load on server for new pages.

# Dev Notes:
  This project is set up as type module in package.json require to used import test from "./test.js" and incorrect from "./test" does not work. It need file name extension. For the server and client script to work.

  Some packages will required some simple like random id as reactjs required key when doing map loop render html.

  Note: Some file might be change depend on the logic thinking. Due to case sensitive when working with linux.

  Need to rebuild or rework the layout for logics as learning more about the context and other functions.

- dayjs
  
  Used for time stamp for time or date for data store.

- nanoid
  
  Use for random number for react js components.

# React:
By using the the react relate packages. To imporve logic code, layout and other things. 

- react
- react-dom
- react-router-dom
- react-redux
- @reduxjs/toolkit

Work in progress testing...

# Database:
  Using mongodb for easy update data.

# Features:
- Auth Token:
  - Refreh token ( Added )
  - Access Token ( Added )
  - Base Token without login but verify access. ( Added )
  - Examples ( ( Added ) )
  - middleware verify access Refreh token ( Added )
- Account management dummy test (work in progress)
  - sign up ( added )
  - logout ( added )
  - change password ( added )
  - forgot password ( not added )
  - verify checks ( not added )
  - api fetch ( added / wip )
  - use session ( used )
  - use cookie ( used / token )
- Notify (simple dispatch)
  - [notify doc ](/docs/notify.md)
  - context
  - provider
  - useReducer

- express
  - button cookie fetch test
  - button session fetch test
- Theme toggle light and dark ( added / simple / work in progress)
  - custom color (not added)
- route pages (added / work in progress)
- test lab page (testing features in simple form)
  - notfity test type meeages with button ( added )
  - 
- redux
  - notify ( added )
  - counter ( added )
  - posts ( added /  work in progress)
- upload ( added / simple )
  - using the reactjs
  - progress bar ( added )
- download ( added / simple )
  - using the reactjs
  - progress bar ( added )
- Game
  - moblie base game
  - Testing game logic.

# React Hooks:
  Note there are free hooks from reference react javascript R&D.

# setup:
  Need to install mongodb and nodejs.

  This simple express without the hot reload and no ssr. Manual refresh page.
```
$ npm install

$ npm run dev
```

## Vite set up:
  This vite express with the hot reload, ssr and auto compile jsx to the browser client.
```
$ npm run vitebuild ( build dist server and client )
$ npm run generate ( build html files )
$ npm run devv ( set up hot reload server ssr )
```

.env
```
REFRESH_TOKEN_SECRET="REFRESH_TOKEN_SECRET"
ACCESS_TOKEN_SECRET="ACCESS_TOKEN_SECRET"
BASE_TOKEN_SECRET="BASE_TOKEN_SECRET"
SECRET="SECRET"
DATABASE_URL="mongodb://127.0.0.1/blankreact"
```