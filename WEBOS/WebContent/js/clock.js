function initClock(){
	var worker = new Worker("js/timer.js");
	
	var canvas = document.getElementById("canvas");
	if (canvas == null)  
        return false;  
    var context = canvas.getContext('2d');
    context.lineWidth = 2; 
    
    context.translate(64, 64);

    //minute hand
    context.beginPath();
    context.moveTo(0,0);  
    var date = new Date(); 
    var mhx = 37*Math.cos((date.getMinutes()-15)*Math.PI/30);
    var mhy = 37*Math.sin((date.getMinutes()-15)*Math.PI/30);
    context.lineTo(mhx, mhy);
    context.closePath();
    context.stroke();
    
    //hour hand
    context.beginPath();
    context.moveTo(0,0);  
    var date = new Date(); 
    var hour = date.getHours();
    if(hour>=12)
    	hour = hour - 12;
    var minute = date.getMinutes();
    var hhx = 27*Math.cos((hour-3)*Math.PI/6 + minute*Math.PI/360);
    var hhy = 27*Math.sin((hour-3)*Math.PI/6 + minute*Math.PI/360);
    context.lineTo(hhx, hhy);
    context.closePath();
    context.stroke();
    
    
    worker.onmessage = function(event){ 
    	
    	context.clearRect(-64, -64, 128, 128);
    	
    	//minute hand
    	context.beginPath();
    	context.moveTo(0,0);  
    	var date = new Date(); 
    	var mhx = 37*Math.cos((date.getMinutes()-15)*Math.PI/30);
    	var mhy = 37*Math.sin((date.getMinutes()-15)*Math.PI/30);
    	context.lineTo(mhx, mhy);
    	context.closePath();
    	context.stroke();
    	
        //hour hand
        context.beginPath();
        context.moveTo(0,0);  
        var date = new Date(); 
        var hour = date.getHours();
        if(hour>=12)
        	hour = hour - 12;
        var minute = date.getMinutes();
        var hhx = 27*Math.cos((hour-3)*Math.PI/6 + minute*Math.PI/360);
        var hhy = 27*Math.sin((hour-3)*Math.PI/6 + minute*Math.PI/360);
        context.lineTo(hhx, hhy);
        context.closePath();
        context.stroke();
    };
    worker.postMessage("");
}





