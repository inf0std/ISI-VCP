var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
    //profile
  res.send('');
});
router.post('/connection', function(req, res) {
    //profile
  res.send('');
});
router.post('/subscribe', function(req, res) {
    //profile
  res.send('');
});
router.get('/user/conversation', function(req, res) {
    //profile
  res.send('');
});
router.get('/user/notification', function(req, res) {
    //profile
  res.send('');
});
router.get('/user/contact', function(req, res) {
    //profile
  res.send('');
});
router.get('/conversation', function(req, res) {
    //profile
  res.send('');
});
router.get('/user/suggestion', function(req, res){

});
router.post('/user/program')
router.get

module.exports = router;