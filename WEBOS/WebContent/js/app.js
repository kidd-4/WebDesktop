//initial some apps
function initApps(){
	var apps = getApps();
	for(var i=0; i<apps.length; i++){	
		var app = document.createElement('img');
		app.src = apps[i].img;
		app.id = apps[i].appId;
	    var iconHolder = document.getElementById("iconHolder" + apps[i].position); 
	    iconHolder.appendChild(app);
	}		
}

//app can also be got from server by using Ajax
function getApps(){
	return defaultApps;
}

//open an app
function openApp(appId){	
	var time = new Date().getTime();  
	var action = "open app"; 
	var details = "open: " + appId; 
	addHistory(time, action, details);
	 				
	var appScript = getAppScript(appId);
	eval(appScript);
}

//app script can also be got from server by using Ajax
function getAppScript(appId){
	for(var i=0; i<defaultAppScripts.length; i++){	
		if(defaultAppScripts[i].appId == appId){
			return defaultAppScripts[i].script;
		}
	}
}

//open context menu of app
function openAppContextMenu(appId, ev){ 
	var appContextMenu = document.getElementById("appContextMenu");
	appContextMenu.style.display="block";
	appContextMenu.style.pixelTop=ev.clientY;
	appContextMenu.style.pixelLeft=ev.clientX;
	appContextMenu.style.background = "#eee";
	appContextMenu.style.color = "black";
	appContextMenu.style.fontSize = "30";
	appContextMenu.style.width = "200px";
	appContextMenu.style.height = "220px";
	appContextMenu.style.opacity = 0.5;
	
	appContextMenu.innerHTML = "";
	//appContextMenu.innerHTML = "<div class='appContextMenu' onclick='openApp(\"" + appId + "\")' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>open</div>";

	var apps = getApps();
	for(var i=0; i<apps.length; i++){
		if(apps[i].appId == appId){		
			for(var j=0; j<apps[i].contextMenu.length; j++){
					appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick=\"appContextMenu.style.display='none';" + apps[i].contextMenu[j].action + "\" onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>"+apps[i].contextMenu[j].name+"</div>";			
			}				
			break;
		}		
	}	 
}//openAppContextMenu()

function openAppProperties(appId){
	alert(appId + " properties");
}
