var func = {
    jsonCall:function (code,message) {
        var data={
            "code":code,
            "message":message
        };
     return JSON.stringify(data)
    },
    // jsonSqlData:function (data) {
    //     return JSON.parse(JSON.stringify(data));
    // }
    jsonSqlData:function (message) {
        var data = {
            code : "1",
            data:message
        };
        return JSON.stringify(data);
    }
};

//我们在自己写模块的时候需要在最后写好模块接口，声明该模块对外暴露什么，module.exports该方法提供了暴露接口的方法
module.exports=func;
