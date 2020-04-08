const express = require("express");
 const router = express.Router();
const multer = require("multer");
const upload = multer({dest:"tmp/"});
const uploads = require("../../common/uploads.js")
 const mysql= require("../../config/db.js");
const moment = require("moment");
const page = require("../../common/page.js");
const fs = require("fs");

//声明路由规则
 //游戏管理首页
router.get("/",function (req,res,next) {
    let p = req.query.p ? req.query.p :1;
    let size = 5;

    mysql.query("select count(*) tot from game,gametype type where game.cid = type.id",function (err,data) {
        if (err){
            return "";
        } else{
           let tot = data[0].tot;

          let fpage =  page (tot,p,size);

            //查询相关数据
            mysql.query("select game.*,type.name tname from game,gametype type where game.cid = type.id order by game.id desc limit ?,?",[fpage.start,fpage.size],function (err,data) {
                if (err){
                    return "";
                } else{
                    data.forEach(item=>{
                        item.time = moment(item.time*1000).format("YYYY-MM-DD HH:mm:ss");
                    })
                    //加载页面
                    res.render("admin/game/index.html",{data:data,show:fpage.show});
                }
            });

        }
    });

});
//游戏管理添加页面
router.get("/add",function (req,res,next) {
    mysql.query("select * from gametype order by sort desc",function (err,data) {
        if (err){
            return "";
        } else{
            res.render("admin/game/add.html",{data:data});
        }
    })

});
//游戏管理添加功能
router.post("/add",upload.single("img"),function (req,res,next) {
    //接收文件上传资源
    let imgRes = req.file;
    //接受表单上传内容
    let {name,keywords,description,operator,author,cid,text,price} = req.body;
    let num=0;
    let time =Math.round((new Date().getTime())/1000);
    //进行图片上传
    let img = uploads(imgRes,"game");
    //进行数据库的插入
    mysql .query("insert into game(name,keywords,description,operator,author,cid,text,price,num,time,img) value(?,?,?,?,?,?,?,?,?,?,?)",[name,keywords,description,operator,author,cid,text,price,num,time,img],function (err,data) {
        //判断
        if (err){
            return "";
        } else{
            if (data.affectedRows==1){
                res.send("<script>alert('添加成功');location.href='/admin/game'</script>");
            } else{
                res.send("<script>alert('添加失败');history.go(-1)</script>");
            }
        }
    })
});
//游戏管理修改页面
router.get("/edit",function (req,res,next) {
    //获取用户修改数据
    let id = req.query.id;
    //查询游戏分类
    mysql.query("select * from gametype order by sort desc",function (err,data) {
        //判断
        if(err){
            return"";
        }else{
            //查询修改游戏对应数据
            mysql.query("select * from game where id = "+id,function (err,data2) {
                if (err){
                    return "";
                } else{
                    //加载修改页面
                    res.render("admin/game/edit.html",{data:data,newData:data2[0]});
                }

            });
        }
    });
});
//游戏管理的修改页面
router.post("/edit",upload.single("img"),function (req,res,next) {
    //接受文件上传资源
  let imgRes = req.file;
  //接受表单数据
 let {id,cid,text,oldimg,description,operator,author,price,keywords,name} = req.body;

 let img = oldimg;
 //判断该用户是否修改图片
    if(imgRes){
        img = uploads(imgRes,"game");
    };
    //发送sql语句
    mysql.query("update game set cid= ? ,text=? , author=? , price=? , description=? , operator=? , keywords=? , name=? , img = ? where id = ?",[cid,text,author,price,description,operator,keywords,name,img,id],function (err,data) {
        //判断
        if (err){
            return "";
        } else {

            //判断影响行数
            if (data.affectedRows==1){
                //判断用户是否修改图片
                if (imgRes){
                    if (fs.existsSync(__dirname+"/../../"+oldimg)){
                       fs.unlinkSync(__dirname+"/../../"+oldimg);
                    };
                } ;
                res.send("<script>alert('修改成功');location.href='/admin/game'</script>");
            }else{
                res.send("<script>alert('修改失败');history.go(-1)</script>");
            };
        };
    });
});
//无刷新删除数据
router.get("/ajax_del",function (req,res,next) {
    //接受到要删除的数据
    let {id,img} = req.query;
    //删除数据
    mysql.query("delete from game where id = "+id,function (err,data) {
        if (err){
            return "";
        } else{
            if (data.affectedRows==1){
                //删除封面图片
                    if (fs.existsSync(__dirname+"/../../"+img)){
                        fs.unlinkSync(__dirname+"/../../"+img);
                    };
               res.send("1");
            } else{
                res.send("0");
            }
        }
    });
})

module.exports = router;