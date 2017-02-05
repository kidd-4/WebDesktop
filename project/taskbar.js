// JavaScript Document
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
		appContextMenu.style.top = 443+"px";  //alert(event.clientY);
		appContextMenu.style.left = 0+"px"; //alert(event.clientX);
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "150px";
		appContextMenu.style.height = "150px";
		appContextMenu.style.opacity = 0.9;
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align='center' onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>Welcome " + username + "</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem'  align='center' onclick='openApp(\"computer\")' onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'><img src='images/computer.png'/></div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align='center' onclick='loginOut()' onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>login out</div>";

		ev.preventDefault();
		ev.stopPropagation();
		
		return false;
	};
	
	var taskBar = document.getElementById("taskBar");
	
	
		taskBar.oncontextmenu =  function(ev){
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="block";
		appContextMenu.style.top=ev.clientY-150+"px";  //alert(event.clientY);
		appContextMenu.style.left=ev.clientX+"px"; //alert(event.clientX);
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "150px";
		appContextMenu.style.height = "150px";
		appContextMenu.style.opacity = 0.9;
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align='center' onclick='openApp(\"taskManager\")' onmouseover='this.style.background=\"lightblue\"' onmouseout='this.style.background=\"#eee\"'>task manager</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align='center' onclick='showDesktop()' onmouseover='this.style.background=\"lightblue\"' onmouseout='this.style.background=\"#eee\"'>show Desktop</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' align='center' onclick='setToolbar()' onmouseover='this.style.background=\"lightblue\"' onmouseout='this.style.background=\"#eee\"'>set Taskbar</div>";

		ev.preventDefault();
		ev.stopPropagation();
		
		return false;
	};
	

	
}