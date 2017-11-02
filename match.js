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
/***打乱数组顺序****/
function shuffle(arr){
  var newArr=arr.concat();
  for(var k=0;k<arr.length;k++){
    var j=Math.floor(Math.random()*(k+1));
    var temp=newArr[k];
    newArr[k]=newArr[j];
    newArr[j]=temp;
  }
  return newArr;
}
var numBad,numGood,arr,bad,good;
function distribute(){
  arr=[],bad=[],good=[];
  var value=document.getElementById("inputText").value;
  var reg=/\d/g;
  if(reg.test(value)){
      value=parseInt(value);
      if(value>=4&&value<=18){
          if(value<15){
              numBad=Math.floor(value/3);
              numGood=value-numBad;
              document.getElementById("bad").innerHTML=numBad;
              document.getElementById("good").innerHTML=numGood;
          }
            else{
                numBad=Math.ceil(value/3-1);
                numGood=value-numBad;
                document.getElementById("bad").innerHTML=numBad;
                document.getElementById("good").innerHTML=numGood;
            }
          for(var i = 0;i < value;i++){
              if(i<numBad){
                  arr.push("杀手");
                  bad.push("杀手");
              }
                else{
                  arr.push("平民");
                  good.push("平民");
                }
          }
          arr=shuffle(arr);
      }
        else{
          document.getElementById("box").style.display="block";
          document.getElementById("overPlay").style.display="block";
        }
  }
    else{
      document.getElementById("box").style.display="block";
      document.getElementById("overPlay").style.display="block";
    }

}
function listener(){
  var myRange = document.getElementById("myRange");
  var IN=document.getElementById("inputText");
  var add=document.getElementById("add");
  var reduce=document.getElementById("reduce");
  add.addEventListener("click",function(){
    myRange.value=parseInt(myRange.value)+1;
    IN.value=myRange.value;
  },false);
  reduce.addEventListener("click",function(){
    myRange.value=myRange.value-1;
    IN.value=myRange.value;
  },false);
  IN.addEventListener("change",function(){
    myRange.value=IN.value;
  },false);
  myRange.addEventListener("change",function(){
    IN.value=myRange.value;
  },false);
}
function start(){
  var clickSet=document.getElementById("clickSet");
  var IN=document.getElementById("inputText");
  var btn=document.getElementById("btn");
  var left=document.getElementById("left");
  var right=document.getElementById("right");
  var overPlay=document.getElementById("overPlay");
  clickSet.addEventListener("click",function(){
    document.getElementById("goodBox").setAttribute("style","visibility:visible;"+"padding-bottom:0.15rem;");
    document.getElementById("badBox").setAttribute("style","visibility:visible;"+"padding-bottom:0.15rem;");
    distribute();
  });
  overPlay.addEventListener("click",function(){
    document.getElementById("box").style.display="none";
    document.getElementById("overPlay").style.display="none";
  },false);
  left.addEventListener("click",function(){
    document.getElementById("box").style.display="none";
    document.getElementById("overPlay").style.display="none";
  },false);
  right.addEventListener("click",function(){
    document.getElementById("box").style.display="none";
    document.getElementById("overPlay").style.display="none";
  },false);
  btn.addEventListener("click",function(){
    var state="none";
    var day=1;
    var kill=[[],[]];
    kill=JSON.stringify(kill);
    day=JSON.stringify(day);
    state=JSON.stringify(state);
    arr=JSON.stringify(arr);
    bad=JSON.stringify(bad);
    good=JSON.stringify(good);
    localStorage.setItem('arr',arr);
    localStorage.setItem('bad',bad);
    localStorage.setItem('good',good);
    localStorage.setItem('state',state);
    localStorage.setItem('day',day);
    localStorage.setItem('kill',kill);
    if(numBad){
      location.href="draw.html"; 
    }
    else{
      document.getElementById("box").style.display="block";
      document.getElementById("overPlay").style.display="block";
    }
  },false);

  
}listener
addonloadEvent(start);
addonloadEvent(listener);