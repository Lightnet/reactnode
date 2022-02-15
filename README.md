# React Node

# LICENSE: MIT

# Create by: Lightnet

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

# Information:
  This is testing project. 
  
  To develop modular react ui, components and api. Justing the using the webpack, babel, express web server and other packages to keep it simple.

  Design for web page to tests api by using fetch call and api since it bundle into single javascript. By using the react dom router for account access, api logic type call, and other things for testing. Without need to reload the url pages to save bandwidth and keep it simple call from fetch url. Plus it reduce the load on server for new pages.

# Dev Notes:
  This project is set up as type module in package.json require to used import test from "./test.js" and incorrect from "./test" does not work. It need file name extension. For the server and client script to work.

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

# features:
- account management dummy test (work in progress)
  - use session (used)
  - use cookie
- notify (simple dispatch)
  - [notify doc ](/docs/notify.md)
  - context
  - provider
  - useReducer
  
- theme toggle light and dark
- route pages
- 

# setup:
  Need to install mongodb and nodejs.

```
npm install

npm run dev
```

.env
```
SECRET="SECRET"
DATABASE_URL="mongodb://127.0.0.1/blankreact"
```