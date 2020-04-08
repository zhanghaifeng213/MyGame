//导入express框架
let express = require("express");
//
const moment = require("moment");
const crypto = require("crypto");
//实列化路由类
let router = express.Router();
//分页方法
const page = require("../common/page.js");

//导入文件处理模块
const fs = require("fs");
//导入数据库
const mysql = require("../config/db.js");
//监听用户访问地址
router.use(function (req,res,next) {
    if (req.url =="/cart"){
        //判断是否登录
        if (req.session.YzmMessageUsername){
            next();
        } else{
            res.send("<script>alert('您还未登录，请先登录');history.go(-1)</script>")
        }
    }else{
        next()
    }
});
//登录处理操作
router.post("/check",function (req,res,next) {
    //接受数据
    let {username,password} = req.body;
    username+="";
    //判断
    if(username){
        if(password){
            //密码加密
            let md5 = crypto.createHash('md5');
            password = md5.update(password).digest('hex');
            //判断数据库中是否有该用户
            mysql.query("select * from user where username = ? and password = ? and status = 0",[username,password],function (err,data) {
                if (err){
                    return ""
                } else{
                    if (data.length){

                        req.session.YzmMessageUsername = data[0].username;
                        res.send("<script>alert('登录成功');location.href='/'</script>")
                        console.log(data)
                    } else{
                        res.send("<script>alert('用户名密码错误或者您已被封禁');history.go(-1)</script>")
                    }
                }
            })
        }else{
            res.send("<script>alert('请登录');location.href='/'</script>")
        }
    }else{
        res.send("<script>alert('请登录');location.href='/'</script>")
    }
});
//退出
router.get("/logout",function(req,res,next){
    req.session.YzmMessageUsername = "";
    res.send("<script>alert('退出成功');location.href='/'</script>");

});
//前台首页
router.get('/',function (req,res,next) {
    //读取网站配置相关信息
    let webconfigData = fs.readFileSync(__dirname+"/../config/webconfig.json");
    let webconfig = JSON.parse(webconfigData.toString());
    //读取分类信息
    mysql.query("select * from gametype order by sort desc limit 10",function (err,data) {
        //判断是否失败
        if (err){
            return "";
        } else{
            //读取轮播图信息
            mysql.query("select * from banner order by sort desc limit 7",function (err,data2) {
                if (err){
                    return "";
                } else{
                    //展示游戏
                    mysql.query("select game.*,gametype.name tname  from game,gametype  where game.cid = gametype.id and gametype.`name`='腾讯游戏' order by game.id asc LIMIT 10 ",function (err,data3) {
                        if (err){
                            return "";
                        } else{
                            //展示游戏
                            mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.id desc LIMIT 1",function (err,data4) {
                                if (err){
                                    return "";
                                } else{
                                    mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.id desc LIMIT 3,5",function (err,data5) {
                                        if (err){
                                            return "";
                                        } else{
                                            mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.price asc LIMIT 1",function (err,data6) {
                                                if (err){
                                                    return "";
                                                } else{
                                                    mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.price asc LIMIT 1,5",function (err,data7) {
                                                        if (err){
                                                            return"";
                                                        } else{
                                                            mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.num asc limit 3",function (err,data8) {
                                                                if (err){
                                                                    return "";
                                                                } else{
                                                                    mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.id desc LIMIT 3",function (err,data9) {
                                                                        if (err){
                                                                            return "";
                                                                        } else{
                                                                            data9.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            data8.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            data7.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            data6.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            data5.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            data4.forEach(item=>{
                                                                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                                                                            });
                                                                            //加载首页
                                                                            res.render("home/index.html",{
                                                                                webconfig:webconfig,
                                                                                typeData:data,
                                                                                sliderData:data2,
                                                                                gameData:data3,
                                                                                gamesData:data4,
                                                                                gamessData:data5,
                                                                                gametwoData:data6,
                                                                                gamethreeData:data7,
                                                                                gamefourData:data8,
                                                                                gamefiveData:data9,

                                                                            });
                                                                        }
                                                                    })

                                                                }
                                                            })

                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            });
        }
    })
});


//前台游戏分类页面
router.get('/store',function (req,res,next) {
    let p = req.query.p ? req.query.p:1;
    let size = 5;

    mysql.query("select count(*) tot from game,gametype  where game.cid = gametype.id  order by game.id desc",function (err,data2) {
        if (err){
            return "";
        } else{
            let tot = data2[0].tot;

            let fpage = page(tot,p,size);

            //读取分类信息
            mysql.query("select * from gametype order by sort desc ",function (err,data) {
                //判断是否失败
                if (err){
                    return "";
                } else{
                    mysql.query("select game.*,gametype.name tname  from game,gametype  where game.cid = gametype.id  order by game.id desc limit ?,? ",[fpage.start,fpage.size],function (err,data3) {
                        if (err){
                            return "";
                        } else{
                            data3.forEach(item=>{
                                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
                            });
                            //加载页面
                            res.render("home/store.html",{
                                typeData:data,
                                how:data2,
                                gameData:data3,
                                show:fpage.show
                            });
                        }
                    });

                }
            });
        }
    })



});
//后台跳转页面
router.get('/login',function (req,res,next) {
    res.render("admin/login.html");
});
//前台游戏详情页面
router.get('/particulars',function (req,res,next) {
    let id = req.query.id;
    mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id AND game.id="+id,function (err,data) {
        if (err) {
            return "";
        }else{
            data.forEach(item=>{
                item.time = moment(item.time*1000).format("YYYY-MM-DD ");
            });
            //加载页面
            res.render("home/particulars.html",{
                gData:data
            });
        }
    });
});
//前台购物车页面
router.get('/cart',function (req,res,next) {
    res.render("home/cart.html")
});
//前台注册功能
router.post("/",function (req,res,next) {
    let {username,password,repassword,email} = req.body
   //判断用户名是否书写
    if (username){
        //判断长度
        if (username.length>=2 && username.length<=12) {
            //判断密码
            if (password){
                //判断两次密码是否一致
                if (password==repassword){
                    //判断用户名是否存在
                    mysql.query("select * from user where username = ?",[username],function (err,data) {
                        if (err){
                            return "";
                        } else{
                            //判断该用户名是否注册
                            if (data.length==0){
                                //没有注册
                                let time = Math.round((new Date().getTime())/1000);
                                let md5=crypto.createHash('md5');
                                password=md5.update(password).digest('hex');
                                mysql.query("insert into user(username,password,email,time) value(?,?,?,?)",[username,password,email,time],function (err,data) {
                                    if (err){
                                        return "";
                                    }else{
                                        //判断是否执行成功
                                        if(data.affectedRows==1){
                                            res.send("<script>alert('注册成功');location.href='/'  </script>");
                                        }else{
                                            res.send("<script>alert('注册失败');history.go(-1)</script>");
                                        }
                                    }
                                })
                            } else{
                                res.send("<script>alert('该用户已经注册，请重新输入');history.go(-1)</script>");
                            }
                        }
                    })
                } else {
                    res.send("<script>alert('两次密码不一致');history.go(-1)</script>");
                }
            } else{
                res.send("<script>alert('请输入密码');history.go(-1)</script>");
            }
        }else{
            res.send("<script>alert('用户名长度2-12位之间');history.go(-1)</script>");
        }
    } else{
        res.send("<script>alert('请输入账户名');history.go(-1)</script>");
    }
});


module.exports = router;