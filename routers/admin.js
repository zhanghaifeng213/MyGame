//导入express
let express = require("express");
//加载加密模块
const crypto = require("crypto");
const mysql =require("../config/db.js");

//实列化
let router = express.Router();

//监听用户的访问地址
router.use(function (req,res,next) {
   //判断url地址是否可以直接进行访问
    if (req.url !="/login" && req.url != "/check") {
//判断是否登录
        if (req.session.YzmMessageIsAdmin && req.session.YzmMessageUsername) {
            next();
        }else{
            res.send("<script>alert('请登录');location.href='/admin/login'</script>")
        }
    }else{
        next();
    }
});
//登录页面
router.get("/login",function (req,res,next) {
    res.render("admin/login.html")
});


//登录处理
router.post("/check",function (req,res,next) {
    //接受数据

    let{username,password} = req.body;
    username+="";
    //判断
    if (username){
        if (password){
            //密码加密
            let md5 = crypto.createHash('md5');
            password = md5.update(password).digest('hex');
            //判断数据库中是否有该用户
            mysql.query("select * from admin where username = ? and password = ? and status = 0",[username,password],function (err,data) {
                if (err){
                    return "";
                } else{
                  if (data.length){
                      req.session.YzmMessageIsAdmin = true;
                      req.session.YzmMessageUsername = data[0].username;
                      res.send("<script>alert('登录成功');location.href='/admin/'</script>");
                  } else{
                      res.send("<script>alert('登录失败，请重新登录');location.href='/admin/login'</script>");
                  }
                }
            }) ;
        } else{
            res.send("<script>alert('请登录');location.href='/admin/login'</script>");
        }
    }else{
        res.send("<script>alert('请登录');location.href='/admin/login'</script>");
    }
});
//登出
router.get("/logout",function (req,res,next) {
    req.session.YzmMessageIsAdmin = false;
    req.session.YzmMessageUsername = "";
    res.send("<script>alert('退出成功');location.href='/admin/login'</script>");
});


//后台首页路由
router.get("/",function(req,res,next){

    //加载对应后台页面
    res.render("admin/index");
});
//后台登录页面
router.get("/login",function(req,res,next){

    //加载对应后台页面
    res.render("admin/login");
});
//后台欢迎页面
router.get("/welcome",function (req,res,next) {
    //加载对应欢迎页面
    res.render("admin/welcome");
})

//前台页面路由
let indexRouter = require('./index');
router.use('/index',indexRouter);

//管理员管理
let adminRouter = require('./admin/admin');
router.use('/admin',adminRouter);
//会员管理
let userRouter = require('./admin/user');
router.use('/user',userRouter);
//轮播图管理
let sliderRouter = require('./admin/slider');
router.use('/slider',sliderRouter);
//游戏分类管理
let typeRouter = require('./admin/gametype.js');
router.use('/type',typeRouter);
//游戏详情管理
let gameRouter = require('./admin/game.js');
router.use('/game',gameRouter);
//评论管理
let commentRouter = require('./admin/comment.js');
router.use('/comment',commentRouter);
//系统管理
let systemRouter = require('./admin/system');
router.use('/system',systemRouter);
//订单管理

module.exports = router;