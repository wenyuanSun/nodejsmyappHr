var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  //只是渲染
  // res.render('index', { title: 'Express' });
//  通过重定向到index.admin
  res.redirect('./index.html');
});

router.get('/manageUser',function(req,res,next) {
  res.redirect('../../admin/manageUser.html');
});

router.get('/userHome',function(req,res,next) {
  res.redirect('../../user/userHome.html');
});


router.get('/manageUser',function(req,res,next) {
  res.redirect('../../admin/manageUser.html');
});


module.exports = router;
