//https://expressjs.com/en/guide/routing.html

import express from 'express';
const router = express.Router();

//Middle ware that is specific to this router
//router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  //next();
//});

// define the name page route
router.get('/sign', function (req, res) {
  res.send(`
  <html lang="en">
  page
  </html>`)
})

export default router;