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

function Dear(state){
  var fsm=new StateMachine({
    init:state,
    transitions:[
        {name:'kill', from:'none', to:'killed'},
        {name:'tosay',from:'killed',to:'testament'},
        {name:'todiscuss',from:'testament',to:'discussing'},
        {name:'tovote',from:'discussing',to:'voting'},
        {name:'toclear',from:'voting',to:'none'}
    ]
  });

  $(".kill").click(function () {
    if(fsm.state=="none"){
      fsm.kill();
      state=JSON.stringify(fsm.state);
      localStorage.setItem("state",state);
      window.location.href="vote.html";
    }
    else{
      bootbox.alert("请按游戏顺序进行步骤!");
    }
    });
    $(".complain").click(function () {
        if(fsm.state=="killed"){
            fsm.tosay();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            $(".complain").css("background-color","#83b09a");
            $(".complain+span").css("color","#83b09a");
            bootbox.alert("请死者亮明身份并且发表遗言！");
        }else{
            bootbox.alert("请按游戏顺序进行步骤!");
        }

    });
    $(".speak").click(function () {
        if(fsm.state=="testament"){
            fsm.todiscuss();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            $(".speak").css("background-color","#83b09a");
            $(".speak+span").css("color","#83b09a");
            bootbox.alert("玩家依次发言讨论!");
        }else{
          bootbox.alert("请按游戏顺序进行!");
        }
    });
    $(".vote").click(function () {
        if(fsm.state=="discussing"){
            fsm.tovote();
            state=JSON.stringify(fsm.state);
          localStorage.setItem("state",state);
          window.location.href="vote.html";
        }else{
          bootbox.alert("请按游戏顺序进行!");
        }
    });
    switch(state){
        case 'voting':
            fsm.toclear();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            return fsm;
            break;
    }
}
function start(){
  $("#diary").click(function(){
    window.location.href="diary.html";
  })
  Dear(state);
}
function reset(){

if(day>=2){
    for(var i=day-2;i>=0;i--){
      var lastDay=$("#Diary").clone(false);
      lastDay[0].setAttribute("class","not");
      lastDay.insertAfter($("header"));
      lastDay.find(".day").html("第"+(i+1)+"天");
      lastDay.css("display","block");
      lastDay.find(".Process").css("display","none");
      if(kill[0][i]){
        var m=parseInt(kill[0][i].slice(2));
        lastDay.find(".kill-text").html("晚上："+(m+1)+"号被杀手杀死,"+"身份是"+arr[m]);
      }
      if(kill[1][i]){
        var n=parseInt(kill[1][i].slice(2));
        lastDay.find(".vote-text").html("白天："+(n+1)+"号被全民投票投死,"+"身份是"+arr[n]);
      }
    }
    var last=$(".section").last();
    last.find(".day").html("第"+day+"天");
    var help=true;
    $(".not").click(function(){
      $(".not").find(".Process").css("display","none");
      if(help){
        $(this).find(".Process").css("display","block");
        help=false;
      }
      else{
        $(this).find(".Process").css("display","none");
        help=true;
      }
    });
  }
  if(kill[0][day-1]){
    var last=$(".section").last();
    var m=parseInt(kill[0][day-1].slice(2));
    last.find(".kill-text").html((m+1)+"号被杀死,"+"身份是"+arr[m]);
    }
  if(state=="killed"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
  }
  else if(state=="testament"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
    $(".complain").css("background-color","#83b09a");
    $(".complain+span").css("color","#83b09a");
  }
  else if(state=="discussing"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
    $(".complain").css("background-color","#83b09a");
    $(".complain+span").css("color","#83b09a");
    $(".speak").css("background-color","#83b09a");
    $(".speak+span").css("color","#83b09a");
  }
}
addonloadEvent(reset);
addonloadEvent(start);