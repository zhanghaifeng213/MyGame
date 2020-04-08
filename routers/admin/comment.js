const express = require("express");

const router = express.Router();

const moment = require("moment");

const mysql = require("../../config/db.js");
const page = require("../../common/page.js");

//展示评论管理
router.get("/",function (req,res,next) {
    let p = req.query.p ? req.query.p:1;
    let size = 4;

    mysql.query("select count(*) tot from comment,user,game where comment.user_id = user.id and comment.game_id = game.id order by comment.id desc",function (err,data) {
        if (err){
            return "";
        } else{
            let tot = data[0].tot;
            let fpage = page(tot,p,size);
            //执行sql语句
            mysql.query("select comment.*,user.username,game.name,game.img from comment,user,game where comment.user_id = user.id and comment.game_id = game.id order by comment.id desc limit ?,?",[fpage.start,fpage.size],function (err,data) {
                if (err){
                    return "";
                } else{
                    data.forEach(item=>{
                        item.time = moment(item.time*1000).format("YYYY-MM-DD HH:mm:ss");
                    })
                    //加载页面
                    res.render("admin/comment/index.html",{
                        data:data,
                        show:fpage.show
                    })
                }
            });

        }
    })


});
//无刷新修改状态
router.get("/ajax_status",function (req,res,data) {
    //接受数据
    let {id,status}=req.query;
    //修改数据库中的数据
    mysql.query("update comment set status = ? where id = ?",[status,id],function (err,data) {
        if (err){
          return "";
        } else{
           if (data.affectedRows==1){
              res.send("1");
           } else{
              res.send("0");
           }
        }
    })
})

module.exports = router;