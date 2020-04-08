let express = require("express");
let router = new express.Router();
//导入数据库模块
const mysql = require("../../config/db.js");

//导入时间格式化
const  moment = require("moment");
//导入分页方法
const page = require("../../common/page.js");
//会员管理首页
router.get('/',function(req,res,next){
   //res.send("会员管理首页");
    //开发分页
    //获取页码
    let p = req.query.p ? req.query.p :1;
    //接收检索数据
    let search = req.query.search ? req.query.search :"";

    //默认每页展示数据个数
    let size=6;

    //计算总数据
mysql.query("select count(*) tot from user where username like ?",['%'+search+'%'],function (err,data) {
    //判断
    if (err) {
        return "";
    }else{
        //获取总数据
      let tot = data[0].tot;
        let fpage = page(tot,p,size);

        //查看数据
        mysql.query("select * from user where username like ? order by id desc limit ?,?",['%'+search+'%',fpage.start,fpage.size],function (err,data) {
            //判断错误信息
            if (err){
                return "";
            } else{
                //将时间格式化
                data.forEach(item=>{
                    item.time = moment(item.time*1000).format("YYYY-MM-DD HH:mm:ss")
                })
                //加载页面
                res.render("admin/user/index.html",
                    {
                        data:data,
                        show:fpage.show,
                        search:search
                    }
                );
            }
        });

    }
})


});

//无刷新修改状态
router.get("/ajax_status",function(req,res,next){
    //接收对应的数据
    let {id,status} = req.query;
    //修改数据
    mysql.query("update user set status=? where id = ?",[status,id],function (err,data) {
        if (err){
            return "";
        } else{
            if (data.affectedRows==1){
                res.send("1");
            }else{
                res.send("0");
            }
        }
    });
});

module.exports = router;