//点击div放大
document.getElementById("bg001").onclick=function(){
    if(this.offsetHeight<200){
        this.style.height="520px";
    }else{
        this.style.height="80px";
    }
        if(document.getElementById("bg002").style.opacity<0.5){
            document.getElementById("bg002").style.opacity="1";
        }else{
            document.getElementById("bg002").style.opacity="0";
        }

};

//点击div消失
// document.getElementById("bg001").onclick=function(){
//     if(document.getElementById("bg002").style.opacity<0.5){
//         document.getElementById("bg002").style.opacity="1";
//     }else{
//         document.getElementById("bg002").style.opacity="0";
//     }
// };


var left = document.getElementById("left");
var right = document.getElementById("right");

var content = document.getElementById("content");
var index = 0;
left.onclick = function () {
    index = index + 410;

    content.style.left = index + "px";

}

right.onclick = function () {
    index = index - 410;
    content.style.left = index + "px";
};
//
window.onload = function(){
    var login = document.querySelector('#login');
    var close = document.querySelector('#close');
    var mask = document.querySelector('.login-mask');
    init();
    login.onclick = function(){
        mask.style.display = "block";
    }
    close.onclick = function(){
        mask.style.display = "none";
    }
}
var bottomPosition=-550;
function init(){
    //因为整个文档中有只有一个div，所有通过这种方式获取了存储图片的div了
    var ggao = document.getElementsByClassName("ggao")[0];
    //设置了bottom属性，使得开始加载的时候这个div是看不到的
    ggao.style.bottom=bottomPosition+"px";
    bottomPosition+=1;//没启动这个函数位置就会向上移动一个像素。
    if(bottomPosition<0){
        //间隔10毫秒启动这个函数
        setTimeout(init,2);
    }
}
//添加一个关闭按钮
function closeAdv(){
    var ggao = document.getElementsByClassName("ggao")[0];
    ggao.style.display="none";
}

var tew=document.getElementById('cont')
var tow=document.getElementById('wh')
var trw=document.getElementById('riqi')
function getTime(){     	//获取时间
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();

    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour<10) {
        hour='0'+hour;
    }
    if (minute<10) {
        minute='0'+minute;
    }
    if (second<10) {
        second='0'+second;
    }
    var x=date.getDay();//获取星期

    var time=hour+':'+minute+':'+second
    var ri=year+'/'+month+'/'+day+'/'+'星期'+x
    tew.innerHTML=time;//将时间显示在div内
    trw.innerHTML=ri
}
getTime();
setInterval(getTime,1000);

var now = new Date(),hour = now.getHours();
if(hour < 6){
    tow.innerHTML="凌晨好"
    tow.style.Color="red"
}

else if (hour < 9){
    tow.innerHTML="&nbsp&nbsp&nbsp&nbsp握一束清晨光，轻轻放在你的脸庞，带给你一天的清凉，愿你从睡梦中醒来，看到满眼的希望，心中充满宁静与安详，那是我送你的美好愿望，早安朋友！"
    tow.style.Color="#f9a825"
}

else if (hour < 12){
    tow.innerHTML= "上午好！推开一扇窗，屋子里才会充满光亮；为心灵打开一扇窗，才能体验更多的鸟语花香。让心融入世界，把温暖注入心房。"
    tow.style.Color="#43a047"
}

else if (hour < 14){
    tow.innerHTML="&nbsp&nbsp&nbsp&nbsp中午好！带着昨夜的丝丝清凉，把祝福写在夏日的中午，愿你一天的生活快乐安详，愿你以后的日子幸福吉祥，祝午好！"
    tow.style.color="#c62828"
}

else if (hour < 18){
    tow.innerHTML= "&nbsp&nbsp&nbsp&nbsp送您一杯下午茶：以祝福为叶，叮咛做花，热情为水，包容当杯，喝出一天好心情和一生的幸福，下午太热，小心高温！"
    tow.style.color="#bf360c"
}

else if (hour < 22){
    tow.innerHTML= "&nbsp&nbsp&nbsp&nbsp晚上好！在这宁静的夜晚，寄上我温馨的祝福，带去我深深的思念，愿我的一声祝福洗去你一天的劳累，一句晚安带你进入美好的梦幻！一片心意使你每天平安。"
    tow.style.color="#3f51b5"
}

else {
    tow.innerHTML=  "&nbsp&nbsp&nbsp&nbsp夜深了，轻轻的问候，赶走你的烦恼;柔柔的关怀，散去你的困恼;甜甜的嘱咐，吹跑你的疲劳;美美的祝福，送去美梦伴绕。晚安! "
    tow.style.color="#651fff"
}
//设置cookie
function setcookie(){
    var d=new Date();
    d.setTime(d.getTime()+2*60*60*1000);  //设置过去时间为当前时间增加一天
    document.cookie="name=world;expires="+d.toGMTString(); //expires是cookie的一个可选参数，设置cookie的过期时间
    var res=document.cookie;
    return res;  //返回cookie字符串
}
/*判断网页是否是第一次浏览，如果第一次则弹出广告，然后设置cookie值，否则把广告隐藏*/
if(document.cookie==""){

    setcookie();
}else{
    var ggao = document.getElementsByClassName("ggao")[0];
    ggao.style.display='none';
}
// 切换登录/注册界面
function changePage(val){
    var login_div = document.getElementById("login2");
    var register_div = document.getElementById("register");
    if(val == 'login2'){
        login_div.style.display = 'block';
        register_div.style.display = 'none';
        denglu.style.borderBottom = '5px solid #f69c00';
        zhuce.style.borderBottom = '';
        denglu.style.color='#f69c00';
        zhuce.style.color='';
    }else if(val == 'register'){
        login_div.style.display = 'none';     // 同上
        register_div.style.display = 'block';
        denglu.style.borderBottom = '';
        zhuce.style.borderBottom = '5px solid #f69c00';
        denglu.style.color='';
        zhuce.style.color='#f69c00';
    }
}
$(window).scroll(function() {
    var scroll_len = $(window).scrollTop();
    if (scroll_len > 10) {
        $('.dao').fadeIn();
    } else {
        $('.dao').fadeOut();
    };
});
$(function () {
    $(".bbb").click(function () {
        $(".one").animate({
                width:"toggle"
            },500
        )
        $(this).children(".fa").toggleClass("fa-angle-right")
        $(this).children(".fa").toggleClass("fa-angle-left")
    })
})

