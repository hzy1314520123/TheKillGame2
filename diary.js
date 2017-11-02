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
  };
}
var arr=JSON.parse(localStorage.getItem('arr'));
var kill=JSON.parse(localStorage.getItem('kill'));
/*******动态写入页面**********/
function Creat(){
  for(var i=0;i<arr.length;i++){
    var box=$(".box").clone().first();
    box.attr("id","no"+i);
    box.css("display","block");
    box.find(".text").html((i+1)+"号");
    box.find(".IDN").html(arr[i]);
    $("#wrap").append(box);
  }
  for(var i=0;i<kill.length;i++){
      for(var j=0;j<kill[i].length;j++){
        document.getElementById(kill[i][j]).style.backgroundColor="rgb(131,176,151)";
      }
    }
}
function start(){
 Creat();
 if(kill[0].length!=0){
  document.getElementById("btn").innerHTML="返回";
 }
 document.getElementById("btn").addEventListener("click",function(){
  location.href="gameflow.html"; 
 },false);
}
addonloadEvent(start);