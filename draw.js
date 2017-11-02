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
  };
}
var index=1;
var Index=1;
var arr=JSON.parse(localStorage.getItem('arr'));
function watch(){
  if(Index==arr.length){
    btn.innerHTML="法官查看";
    F1.style.display="none";
    F2.style.display="block";
    ID.style.display="block";
    ID.innerHTML=arr[Index-1];
    Index++;
  }
    else if(Index>arr.length){
      location.href="diary.html";
    }
      else{
          if(index%2==1){
              btn.innerHTML="隐藏并传递给"+(Index+1)+"号";
              F1.style.display="none";
              F2.style.display="block";
              ID.style.display="block";
              ID.innerHTML=arr[Index-1];
              
          }
            else{
                Index++;
                btn.innerHTML="查看"+Index+"号身份";
                F1.style.display="block";
                F2.style.display="none";
                ID.style.display="none";
                num.innerHTML=Index;
                
            }
          index++;
      }
}
function start(){
  var btn=document.getElementById("btn");
  var F2=document.getElementById("F2");
  var F1=document.getElementById("F1");
  var ID=document.getElementById("ID");
  var num=document.getElementById("num");
  document.getElementById("btn").onclick=watch;
}
addonloadEvent(start);