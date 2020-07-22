//https://www.cnblogs.com/yang-shun/p/10089669.html
var mysql = require('mysql');
var dbConfig = require('./db.config');
var functions = require('./function');

module.exports = {

  query : function (sql,parame,callback) {
  //    创建与数据库之间的连接
      var connection = mysql.createConnection(dbConfig);
      connection.connect(function (err) {
          if (err){
              console.log('数据库链接失败');
              throw err;
          }
      //    操作数据
          connection.query(sql,parame,function (err,results,fields){
              if (err){
                  console.log('数据操作失败');
                  throw err;
              }
              //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
            // callback && callback(functions.jsonSqlData(results),functions.jsonSqlData(fields));
          //    停止链接数据库
              connection.end(function(err){
                  if (err){
                      console.log('关闭数据库连接失败');
                      throw err;
                  }
              })
          })
      })
  }
};
