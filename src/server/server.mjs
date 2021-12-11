

import express from "express";
import routes from './routes/routes.mjs';
import dotEnv from 'dotenv';
import clientDB from '../lib/database.mjs';
import bodyParser from 'body-parser';


dotEnv.config();

var secret = process.env.SECRET;
console.log(secret)

const app = express();
const port = 3000;

async function main(){
  app.use(express.static('dist'));
  let db = await clientDB();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send(
      '<script src="/bundle.js"></script>'
    )
  })
  //Routes
  app.use(routes); 
  const server = app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
  })
  process.on('SIGTERM',()=>{
    server.close();
  })
}

main();

export default app;