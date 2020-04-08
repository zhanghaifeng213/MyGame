const  fs = require("fs");
const  path = require("path");

function uploads(imgRes,type='') {
//可以获取文件的临时目录
    let temPath = imgRes.path;

//文件上传的指定目录
    let ext = path.extname(imgRes.originalname);
    let newNmae =""+(new Date().getTime())+Math.round(Math.random()*10000)+ext;
    let newPath = "/upload/"+type+"/"+newNmae;
//进行文件的拷贝
    let fileData = fs.readFileSync(temPath);
    fs.writeFileSync(__dirname+"/../"+newPath,fileData);

    return newPath;
}
module.exports=uploads;