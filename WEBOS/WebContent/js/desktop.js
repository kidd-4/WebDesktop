function initDesktop(){		
	var mainDiv = document.getElementById("mainDiv"); 

	//desktop context menu
	mainDiv.oncontextmenu =  function(event){
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="block";
		appContextMenu.style.pixelTop=event.clientY;
		appContextMenu.style.pixelLeft=event.clientX;
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "200px";
		appContextMenu.style.height = "220px";
		appContextMenu.style.opacity = 0.5;
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='refresh()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>refresh</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='setThemes()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>themes setting</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='appContextMenu.style.display=\"none\";viewHistory()' onmouseover='this.style.background=\"darkblue\"' onmouseout='this.style.background=\"#eee\"'>view history</div>";
		
			return false
	    };
	    
	mainDiv.onclick = function(){
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="none";
	};
	
	
	//add drag&drop support
	for(var i=1;i<=120;i++){			
		//add icon holders 
		var iconHolder = document.createElement("div");
		iconHolder.id = 'iconHolder' + i;
		//iconHolder.draggable = "true";
		iconHolder.className = "iconHolder";
		mainDiv.appendChild(iconHolder);
		
		//add drag support
		iconHolder.addEventListener("dragstart", function(ev) {
	        var dt = ev.dataTransfer;
	        //dt.effectAllowed = 'all';           
	        //if(iconHolder.firstChild)
	        dt.setData("text/plain", ev.currentTarget.id);
	         //dt.setDragImage(iconHolder.firstChild, -30, -30);   
	        
		}, false);

		iconHolder.addEventListener("dragover", function(ev) {
			//var dt = ev.dataTransfer;     
			//dt.dropEffect = 'move';                 
			ev.preventDefault();
		}, false);
	    
		//iconHolder.addEventListener("dragend", function(ev) {
			 		//var dt = ev.dataTransfer;     
		       		//dt.dropEffect = 'move';   
			        //ev.preventDefault();                            
		//}, false);

		iconHolder.addEventListener("drop", function(ev) {
			var dt = ev.dataTransfer;
			//dt.dropEffect = 'copy'; 
			var srcIconHolderId = dt.getData("text/plain");
			var srcIconHolder = document.getElementById(srcIconHolderId);

			//if it's recycleBin, delete it
			if(ev.currentTarget.firstChild && ev.currentTarget.firstChild.id == "recycleBin" && srcIconHolder.firstChild.id != "recycleBin"){
				srcIconHolder.innerHTML = "";
			}else if(ev.currentTarget.firstChild){
				var temp =  ev.currentTarget.firstChild;
				ev.currentTarget.appendChild(srcIconHolder.firstChild);   
				srcIconHolder.appendChild(temp);
			}else{	
				ev.currentTarget.appendChild(srcIconHolder.firstChild);
			}
			
			ev.preventDefault();
			ev.stopPropagation();
		}, false);
		
		//bound with apps
		iconHolder.onclick =  function(ev){  
			if(ev.currentTarget.firstChild){
				openApp(ev.currentTarget.firstChild.id);
				ev.stopPropagation();
			}
		};
		
		iconHolder.oncontextmenu =  function(ev)
		{
			if(ev.currentTarget.firstChild){
				openAppContextMenu(ev.currentTarget.firstChild.id, ev);
				ev.stopPropagation();
			}
		
			return false;
		};
		
	}//for
	
	document.ondragover = function(e){e.preventDefault();};
	document.ondrop = function(e){e.preventDefault();};
	
}//initDesktop()

