let express = require("express");
 let router = new express.Router();

 const path = require('path');
 //设置文件上传
const multer = require("multer");

const page = require("../../common/page.js");
const upload = multer({dest:"tmp/"});

//导入fs模块
const  fs = require("fs");
//导入mysql模块
const mysql = require("../../config/db.js");

const uploads = require("../../common/uploads.js");
 //轮播图管理路由

//首页
router.get("/",function (req,res,next) {
    let p = req.query.p ? req.query.p:1;
    let size = 3;

    mysql.query("select count(*) tot from banner order by sort desc",function (err,data) {
        if (err){
            return "";
        } else{
            let tot = data[0].tot;
            let fpage = page(tot,p,size);
            //查找轮播图中的数据
            mysql.query("select * from banner order by sort desc limit ?,?",[fpage.start,fpage.size],function (err,data) {
                if (err){
                    return "";
                } else{
                    //加载页面
                    res.render("admin/slider/index.html",{
                        data:data,
                        show:fpage.show
                    });
                }
            })
        }
    })


});
//添加页
router.get("/add",function (req,res,next) {
    //加载页面
    res.render("admin/slider/add.html");
});
//处理添加功能
router.post("/add",upload.single("img"),function (req,res,next) {
    //获取表单的数据
    let {name,url,sort} = req.body;
    //接受文件上传的数据
    let imgRes = req.file;
    //可以获取文件的临时目录
    let temPath = imgRes.path;

    //文件上传的指定目录
    let ext = path.extname(imgRes.originalname);
    let newNmae =""+(new Date().getTime())+Math.round(Math.random()*10000)+ext;
    let newPath = "/upload/slider/"+newNmae;
//进行文件的拷贝
    let fileData = fs.readFileSync(temPath);
    fs.writeFileSync(__dirname+"/../../"+newPath,fileData);

    //将数据插入到数据库
    mysql.query("insert into banner(name,url,sort,img) value(?,?,?,?)",[name,url,sort,newPath],function (err,data) {
        if(err){
            return "";
        }else{
            if (data.affectedRows==1){
                res.send("<script>alert('添加成功');location.href='/admin/slider'</script>");
            }else{
                res.send("<script>alert('添加失败');history.go(-1)</script>");
            }
        }
    })
});
//修改页
router.get("/edit",function (req,res,next) {
    //获取修改数据的id
    let id = req.query.id;
    //查询对应的数据
    mysql.query("select * from banner where id = "+id,function (err,data) {
        if (err){
            return "";
        } else{
    //加载页面
            res.render("admin/slider/edit.html",{data:data[0]});
        }
    })
});
//修改功能
router.post("/edit",upload.single("img") ,function (req,res,next) {
//接受图片信息
    let imgRes = req.file;
    //接受表单数据
    let {id,name,url,sort,oldimg} = req.body;
   //判断图片资源是否存在
    let sql="";
    let arr=[];
    if (imgRes){
        //先上传图片
       let img = uploads(imgRes,"slider");
        sql = "update banner set name = ?,url = ?,sort = ?,img = ? where id = ?";
        arr = [name,url,sort,img,id];
    }else{
        sql = "update banner set name = ?,url = ?,sort = ? where id = ?";
        arr = [name,url,sort,id];
    }
//发送sql语句
mysql.query(sql,arr,function (err,data) {
    if(err){
        return "";
    }else{
        if(data.affectedRows==1){
            //判断是否修改了图片
            if (imgRes){
                if (fs.existsSync(__dirname+"/../../"+oldimg)){
                    fs.unlinkSync(__dirname+"/../../"+oldimg);
                };
            };
            res.send("<script>alert('修改成功');location.href='/admin/slider'</script>");
        }else{
            res.send("<script>alert('修改失败');history.go(-1)</script>");
        }
    }
});
});

//删除功能
router.get("/ajax_del",function (req,res,next) {
    //接受用户删除的数据
    let{id,img} = req.query;

    //删除数据
    mysql.query("delete from banner where id = "+id,function (err,data) {
        if (err){
            return"";

        } else{
            //判断是否删除成功
            if(data.affectedRows==1){
                //删除对应图片
             if (fs.existsSync(__dirname+"/../../"+img)){
                 fs.unlinkSync(__dirname+"/../../"+img);
             };
                res.send("1");
            }else{
                res.send("0");
            }
        }
    });
});
//无刷新的修改排序
router.get("/ajax_sort",function (req,res,next) {
    //接受数据
    let{id,sort} = req.query;
    //数据的修改
    mysql.query("update banner set sort = ? where id = ?",[sort,id],function (err,data) {
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

module.exports=router;