var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 4

autoSetCanvasSize(yyy)
listenToUser(yyy)  

function drawLine(x1,y1,x2,y2){
    context.beginPath()
    //context.strokeStyle = 'black'
    context.moveTo(x1,y1) //起点 
    //context.lineWidth = 3
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)  //终点
    context.stroke()
    context.closePath()
}
/****************清屏功能**********************/
clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}
/********************************************/

/*************保存到本地的功能******************/
save.onclick = function(){
    var url = yyy.toDataURL("image/png")
    //console.log(url) //调试时可以看到是该文件的字符信息
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的图画'
    a.target = '_blank'
    a.click()
}
/********************************************/

/**************橡皮擦功能部分*******************/
var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false 
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
/*var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
}*/
/*********************************************/ 

/***********换颜色****************************/
red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
yellow.onclick = function(){
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}
black.onclick = function(){
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
/********************************************/

/***************** 自选线体粗细*****************/
thin.onclick = function(){
    lineWidth = 2
}
thick.onclick = function(){
    lineWidth = 7
}
/********************************************/
function autoSetCanvasSize(canvas){
    userResize()
    window.onresize = function(){
        userResize()
    }
    function userResize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight //背下来这两句求页面宽高
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
} 

function listenToUser(canvas){
    var using = false
    var lastPoint = {x:undefined,y:undefined}

    //特性检测
    if(document.body.ontouchstart !== undefined){
      //触屏设备
      canvas.ontouchstart = function(aaa){
        //console.log(aaa)  //可以看到TouchEvent的hash里有touches的数组，[0]表示屏幕上第一个触摸的点
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
       // console.log(x,y)   //可以看到undefined ,说明其与mouse事件坐标hash内部构造不同
        using = true
        if(eraserEnabled){
          context.clearRect(x-5,y-5,10,10)
        }else{
          lastPoint = {"x":x,"y":y}
        }
      }
      canvas.ontouchmove = function(aaa){
        //console.log('边摸边动')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if(!using){return}
        if(eraserEnabled){
          context.clearRect(x-5,y-5,10,10)
        }else{
          var newPoint = {"x":x,"y":y}
          drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
          lastPoint = newPoint
        }
      }
      canvas.ontouchend = function(){
        //console.log('摸完了')
        using = false
      }
    }else{
      //非触屏设备
    canvas.onmousedown = function(aaa){
    var x = aaa.clientX 
    var y = aaa.clientY
    using = true
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)//矩形是把做左上角当起点画，故要减去一点才是矩形中间
    }else{
      lastPoint = {"x":x,"y":y}
    }
   }
  
   canvas.onmousemove = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    if(!using){return}
    if(eraserEnabled){
      context.clearRect(x,y,10,10)
    }else{
        var newPoint = {"x":x,"y":y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
  }
  
   canvas.onmouseup = function(aaa){
    using = false
   }
   }
  }
