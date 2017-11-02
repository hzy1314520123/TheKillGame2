/*******加载函数**********/
function addonloadEvent(func){
  var oldonload=window.onload;
  if(typeof window.onload !='function'){
    window.onload=func;
  }
  else{
    window.onload=function(){
      oldonload();
      func();
    }
  }
}
var arr=JSON.parse(localStorage.getItem('arr'));
var state=JSON.parse(localStorage.getItem('state'));
var kill=JSON.parse(localStorage.getItem('kill'));
var bad=JSON.parse(localStorage.getItem('bad'));
var good=JSON.parse(localStorage.getItem('good'));
var day=JSON.parse(localStorage.getItem('day'));
function reset(){
  if(bad.length>good.length){
    $(".good").html("太棒了!你知道么？在杀人游戏中只有20%的卧底取得游戏最终的胜利哦！");
  }
  else{
    $(".good").html("一般般啦!你知道么？在杀人游戏中有80%的平民取得游戏最终的胜利哦！");
  }
  for(var i=day-1;i>=0;i--){
    var Diary=$(".res_box").clone(false);
    //这个是一个疑点，下面这句删掉会出问题
    Diary[0].setAttribute("class","not");
    Diary.css("display","block");
    Diary.children(".res_span1").html("第"+(i+1)+"天");
    Diary.insertAfter($(".second_part"));
    if(kill[0][i]){
      var m=parseInt(kill[0][i].slice(2));
      Diary.find(".night").html("晚上："+(m+1)+"号被杀手杀死,"+"身份是"+arr[m]);
    }
    if(kill[1][i]){
      var n=parseInt(kill[1][i].slice(2));
      Diary.find(".white").html("白天："+(n+1)+"号被全民投票投死,"+"身份是"+arr[n]);
    }
    if(!kill[0][i]&&!kill[1][i]){
      Diary.children(".res_span1").html("游戏结束");
    }
  }
  $(".againone").click(function(){
    window.location.href="match.html";
  });
  $(".uloading").click(function(){
    window.location.href="#";
  });
}
addonloadEvent(reset);