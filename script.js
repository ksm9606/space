var init = false;
var Context;
var myCanvas;

var snow_max = 120;
var snow = Array();

function Init(){
    if(init == false){
        myCanvas = document.getElementById("MyCanvas");
        Context = myCanvas.getContext("2d");
        for(i=0; i<snow_max; i++){
            var obj = new Object();
            obj.x = Math.random() * myCanvas.width;
            obj.y = Math.random() * myCanvas.height;
            obj.alpha = Math.random();
            obj.size = Math.sqrt(5);
            snow.push(obj);
        }
        init = true;
    }
}

function onDraw()
{
	if(init==false)return;
	Context.fillStyle="#000";
	Context.fillRect(0, 0, myCanvas.width-1, myCanvas.height-1);
	for(i=0;i<snow_max;++i)
	{
		Context.beginPath();	// 
		Context.moveTo(snow[i].x, snow[i].y);
		Context.fillStyle ='rgba(255,255,255,' + snow[i].alpha + ')';
		Context.arc(
			snow[i].x,		// 가로좌표
			snow[i].y,		// 세로좌표
			snow[i].size,	// 원 크기
			0,				// 원호의 시작
			Math.PI * 2		// 원호의 끝
		);
		Context.closePath();
		Context.fill();
	}
	Context.filter = "none";
}

function Run(){
    for(i=0; i<snow_max; i++){
        snow[i].y += snow[i].size * 0.2;
        if(snow[i].y >= myCanvas.height){
            snow[i].y = -10;
        }
    }
    onDraw();
}

$(document).ready(function(){
    Init();
    setInterval(Run,20);
})