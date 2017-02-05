// JavaScript Document
function initApps(){
	var apps = getApps();
	for(var i=0; i<apps.length; i++){	
		var app = document.createElement('img');
		app.src = apps[i].img;
		app.id = apps[i].appId;
	    var iconHolder = document.getElementById("iconHolder" + apps[i].position); //iconHolder即为div,apps[i].position就是第几个div
	    iconHolder.appendChild(app);
	}		
}

function getApps(){
	return defaultApps;
}





//open an app
function openApp(appId){	
	
	
	 				
	var appScript = getAppScript(appId);
	eval(appScript); //eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码
}

//app script can also be got from server by using Ajax
function getAppScript(appId){
	for(var i=0; i<defaultAppScripts.length; i++){	
		if(defaultAppScripts[i].appId == appId){
			return defaultAppScripts[i].script;
		}
	}
}



function openAppContextMenu(appId, ev){ 
	var appContextMenu = document.getElementById("appContextMenu");
	appContextMenu.style.display="block";
	appContextMenu.style.top=ev.clientY +"px";
	appContextMenu.style.left=ev.clientX+"px";
	appContextMenu.style.background = "#eee";
	appContextMenu.style.color = "black";
	appContextMenu.style.fontSize = "30";
	appContextMenu.style.width = "150px";
	appContextMenu.style.height = "150px";
	appContextMenu.style.opacity = 0.9;
	
	appContextMenu.innerHTML = "";
	//appContextMenu.innerHTML = "<div class='appContextMenu' onclick='openApp(\"" + appId + "\")' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>open</div>";

	var apps = getApps();
	for(var i=0; i<apps.length; i++){
		if(apps[i].appId == appId){		
			for(var j=0; j<apps[i].contextMenu.length; j++){
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align = 'center' onclick=\"appContextMenu.style.display='none';" + apps[i].contextMenu[j].action + "\" onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>"+apps[i].contextMenu[j].name+"</div>";			
			}				
			break;
		}		
	}	 
}//openAppContextMenu()

function openAppProperties(appId){
	alert(appId + " properties");
}


