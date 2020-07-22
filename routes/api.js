var express = require('express'); //引入express模块
var mysql = require('mysql');  //引入mysql模块
var session = require('express-session');
var router = express.Router();
var functions = require('../config/function');  //导入function内的方法
var db = require('../config/db');

//重定向到用户登录页面

// router.get('/login',function(req, res, next) {
//     res.redirect('../index.html')
// });

//post处理用户登录数据处理
router.post('/login',function (req,res,next) {
    //管理员rank为1，用户为0
    var email = req.body.email;
    var password = req.body.password;
    var rank = req.body.rank;

    if(email == "" || password == ""){
        res.send(functions.jsonCall(-1,"用户名与密码不许为空"));
    }else{
        //在用户名密码均填写的情况下，进行查询用户名密码与权限是否均匹配
        var sql = "select password,rank from user where email =  '"+email+"'";
        sql.replace("and","where");
        console.log(sql);
        db.query(sql,function (err,rows) {
            if (err){
                console.log("查询失败");
                res.send(functions.jsonCall(-1,"查询失败"));
            }else if (rows == ""){
                res.send(functions.jsonCall(-1,"用户不存在"));
            }else {
                console.log(rows[0].password);
                console.log(password);
                console.log(rows[0].rank);
                if (rows[0].password == password && rows[0].rank == 1){
                    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000/admin/adminHome.html");
                    // //允许跨域后session的存取
                    // res.header('Access-Control-Allow-Credentials', "true");
                    // req.session.emailInfo = email;
                    // req.session.idInfo = rows[0].id;
                    // console.log(req.session.emailInfo);
                    res.send(functions.jsonCall(0, "管理员登陆成功"));
                }else if (rows[0].password == password && rank == 0) {
                    res.send(functions.jsonCall(1, "用户登录成功"));
                }else {
                    res.send(functions.jsonCall(-1,"用户名或密码错误"))
                }
            }
        });

    }

});

//重定向到用户注册页面
router.get('/register',function(req, res, next) {
    res.redirect('../register.html')
});


//注册用户，邮箱处理，密码md5加密，数据插入数据库，用户默认rank为0
router.post('/register',function (req,res,next) {
    var email = req.body.email;
    var password = req.body.password;
    //判断用户是否呗注册
    var sqlEmail = "select password,rank from user where email =  '"+email+"'";
    sqlEmail.replace("and","where");
    db.query(sqlEmail,function (err,row) {
        if (err){
            res.send(functions.jsonCall(-1,"查询失败"));
        }else {
            if (row[0][id] != ""){
                res.send(functions.jsonCall(-1,"该用户已被注册"));
            }
        }
    });
    //插入数据库
    var sql = "insert into user(email,password,rank) value('"+email+"','"+password+"','"+0+"')";
    if(email !== "" && password !== ""){
        db.query(sql,function (err,rows) {
            if (err){
                res.send(functions.jsonCall(-1,"注册失败"));
            }else {
                console.log(functions.jsonCall(1,"注册成功"));
                res.send(functions.jsonCall(1,"注册成功"));
            }
        })
    }
});

//
// 查询所有用户！
router.get('/selectUserAll',function (req,res,next) {
    var sql = "select * from user where rank = 0";
    db.query(sql,function (err,rows) {
        if (err){
            console.log("查询失败");
            res.send(functions.jsonCall(-1,"查询失败"));
        }else {
            var data = [];
            for (var i in rows){
                var temp = {id:rows[i]['id'],email:rows[i]['email'],password:rows[i]['password'],rank:rows[i]['rank']};
                data.push(temp);
            }

            res.send(functions.jsonSqlData(data));
        }
    })
});

// 根据用户email进行模糊查询！
router.post('/selectUserLikeEmail',function (req,res,next) {
    if (req.body.id){
        var likeEmail = req.body.id;
        var sql = "select * from user where email like '"+'%'+likeEmail+'%'+"'";
    }else {
        var sql = "select * from user";
    }

    console.log(sql);
    db.query(sql,function (err,rows) {
        if (err){
            console.log("查询失败");
            res.send(functions.jsonCall(-1,"查询失败"));
        }else {
            var data = [];
            for (var i in rows){
                var temp = {id:rows[i]['id'],email:rows[i]['email'],password:rows[i]['password'],rank:rows[i]['rank']};
                data.push(temp);
            }
            res.send(functions.jsonSqlData(data));
        }
    })
});

//根据id查询
router.get('/select/:id',function (req,res,next) {
    var id = req.params.id;
    var sql = "select * from user";
    if (id){
        sql += " where id = '" + id +"'" ;
    }
    // var sql = "select password,rank from user where email =  'admin@qq.com'";
    sql.replace("and","where");
    db.query(sql,function (err,rows) {
        if (err){
            console.log("查询失败");
            res.send("查询失败")
        }else {
            console.log(rows[0].password,rows[0].rank);
            // res.send(rows[0].password,rows[0].rank);
            res.send(rows);
        }
    })
});

//根据id进行删除
router.post('/user/delete/:id',function (req,res,next) {
   var id = req.params.id;
   console.log(id);
   db.query("delete from user where id = " + id,function (err,rows) {
       if (err){
           res.send(functions.jsonCall(-1,"删除失败"));
       }else {
           res.send(functions.jsonCall(1,"删除成功"));
       }
   })
});


//post处理用户登录数据处理
router.post('/addUserInfo',function (req,res,next) {
    //男0，女1
    var username = req.body.username;
    var sex = req.body.sex;
    var YYYY = req.body.YYYY;
    var MM = req.body.MM;
    var DD = req.body.DD;
    var site = req.body.site;

    //时间戳不选择则信息默认为0
    if(username == "" || sex == "" || YYYY == "0" || MM == "0" || DD == "0" || site == ""){
        res.send(functions.jsonCall(-1,"请用户个人信息填全"));
    }else{
        var newMM = "0" + MM;
        var newDD = "0" + DD;
        var newData = YYYY + "-" + newMM + "-" + newDD;
        var sql = "insert into personalInfo(username,sex, registDate, dress, userid) value('"+username+"','"+sex+"','"+newData+"','"+site+"','"+1+"')";
        db.query(sql,function (err,rows) {
            console.log(sql);
            if (err){
                res.send(functions.jsonCall(-1,"信息填写失败"));
            }else {
                res.send(functions.jsonCall(1,"信息填写成功"));
            }
        });
    }

});
module.exports = router;


