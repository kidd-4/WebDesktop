function loginOut(){
	window.location = "login.html";
}

function initTaskbar(){
	
	//startIcon
	var startIconHolder = document.getElementById("startIconHolder"); 
	   
	startIconHolder.oncontextmenu =  function(ev){
		ev.preventDefault();
		ev.stopPropagation();
	};
	
	startIconHolder.onclick =  function(ev){
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="block";
		appContextMenu.style.pixelTop = ev.clientY-220;  //alert(event.clientY);
		appContextMenu.style.pixelLeft = ev.clientX-30; //alert(event.clientX);
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "200px";
		appContextMenu.style.height = "220px";
		appContextMenu.style.opacity = 0.5;
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>Welcome " + username + "</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='openApp(\"computer\")' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>computer</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='loginOut()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>login out</div>";

		ev.preventDefault();
		ev.stopPropagation();
		
		return false;
	};
   
	//taskBar
   	var taskBar = document.getElementById("taskBar");
   
   	taskBar.oncontextmenu =  function(ev){
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="block";
		appContextMenu.style.pixelTop=ev.clientY-220;  //alert(event.clientY);
		appContextMenu.style.pixelLeft=ev.clientX; //alert(event.clientX);
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "200px";
		appContextMenu.style.height = "220px";
		appContextMenu.style.opacity = 0.5;
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='openApp(\"taskManager\")' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>task manager</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='showDesktop()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>show Desktop</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='setToolbar()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>set Taskbar</div>";

		ev.preventDefault();
		ev.stopPropagation();
		
		return false;
	};
	    
}//initTaskbar()	