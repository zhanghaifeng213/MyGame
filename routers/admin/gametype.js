const express = require("express");

const router = express.Router();

//导入数据库相关的模块
const  mysql = require("../../config/db.js")

const page = require("../../common/page.js");

//分类的查看页面
router.get("/",function (req,res,next) {
    let p = req.query.p ? req.query.p:1;
    let size = 6;

    mysql.query("select count(*) tot from gametype order by sort desc",function (err,data2) {
        if (err){
            return "";
        } else{
            let tot = data2[0].tot;
            let fpage = page(tot,p,size);
            //从数据库中查询相关数据
            mysql.query("select * from gametype order by sort desc limit ?,?",[fpage.start,fpage.size],function (err,data) {
                if (err){
                    return "";
                } else{
                    //加载页面
                    res.render("admin/type/index.html",{
                        data:data,
                        show:fpage.show
                    })
                }
            });

        }
    })


});
//分类的添加页面
router.get("/add",function (req,res,next) {
    //加载页面
    res.render("admin/type/add.html")
});
//分类的添加操作
router.post("/add",function (req,res,next) {
    //接受数据
   let {name,keywords,description,sort} = req.body;
   //将数据插入数据库
    mysql.query("insert into gametype(name,keywords,description,sort) value(?,?,?,?)",[name,keywords,description,sort],function (err,data) {
        //判断是否错误
        if (err){
            return "";
        } else{
            //判断是否执行成功
            if (data.affectedRows==1){
                res.send("<script>alert('添加成功');location.href='/admin/type'</script>");
            } else{
                res.send("<script>alert('添加失败');history.go(-1)</script>");
            }
        }
    })
})
//分类的修改页面
router.get('/edit',function(req,res,next){
    //接受数据的id
    let id = req.query.id;
    //查询对应数据
    mysql.query("select * from gametype where id = "+id,function (err,data) {
        //判断
        if (err){
            return "";
        } else{
            //加载修改页面
            res.render("admin/type/edit.html",{data:data[0]});
        }
    })
});
//分类修改方法
router.post("/edit",function (req,res,next) {
   //接受表单提交数据
    let id = req.query.id;
   let {name,keywords,description,sort} = req.body;

   //发送sql语句
    mysql.query("update gametype set name = ?,keywords = ?,description = ?,sort = ? where id = ?",[name,keywords,description,sort,id],function (err,data) {
        if (err){
            return "";
        } else{
            if (data.affectedRows==1){
                res.send("<script>alert('修改成功');location.href='/admin/type'</script>");
            } else{
                res.send("<script>alert('修改失败');history.go(-1)</script>");
            }
        }
    })
});

//无刷新删除数据
router.get("/ajax_del",function (req,res,next) {
    //接收地址栏数据
    let id = req.query.id;
    //删除数据
    mysql.query(`delete from gametype where id = ${id}`,function (err,data) {
        if (err){
            return "";
        } else{
            //判断是否执行成功
            if(data.affectedRows==1){
                res.send("1");
            }else{
                res.send("0");
            }
        }
    })
});
//无刷新的修改排序
router.get("/ajax_sort",function (req,res,next) {
    //接受数据
    let{id,sort} = req.query;
    //数据的修改
    mysql.query("update gametype set sort = ? where id = ?",[sort,id],function (err,data) {
        //判断是否执行成功
        if(err){
            return"";
        }else{
            if(data.affectedRows==1){
                res.send("1");
            }else{
                res.send("0");
            }
        }
    });
});

module.exports = router;