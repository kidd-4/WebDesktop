// JavaScript Document

function initDesktop()
{
		var mainDiv = document.getElementById("mainDiv");
	
		mainDiv.oncontextmenu = function(){    // oncontextmenu事件，当用户在 <div> 元素 上右击鼠标时执行 JavaScript 
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="block";
		/**appContextMenu.style.pixelTop=event.clientY; //chrome不适用
		alert(event.clientY);
		appContextMenu.style.pixelLeft=event.clientX;**/
		appContextMenu.style.left = event.clientX +"px";
		appContextMenu.style.top = event.clientY +"px";
		appContextMenu.style.background = "#eee";
		appContextMenu.style.color = "black";
		appContextMenu.style.fontSize = "30";
		appContextMenu.style.width = "150px";
		appContextMenu.style.height = "150px";
		appContextMenu.style.opacity = 0.9;
		
		
		
		
		
		appContextMenu.innerHTML = "";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='Myrefresh()' align='center'  onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>refresh</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='setThemes()' align='center' onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>themes setting</div>";
		appContextMenu.innerHTML += "<div class='appContextMenuItem' onclick='appContextMenu.style.display=\"none\";createNewFile()' align='center' onmouseover='this.style.border=\"2px solid #78cdd1\"; this.style.background=\"#afdfe4\"' onmouseout='this.style.border=\"#eee\";this.style.background=\"#eee\"'>create file</div>";
		
			return false
	
	};
	
	
	
		mainDiv.onclick = function(){                      //单击桌面不显示appContextMenu
		var appContextMenu = document.getElementById("appContextMenu");
		appContextMenu.style.display="none";
	};
	
	for( var i=1;i<=120;i++)
	{
		var iconHolder = document.createElement("div");
		
		iconHolder.id = 'iconHolder' + i;
		
		iconHolder.style.width = "90px";
		iconHolder.style.height = "70px";
		iconHolder.style.border = "1px";
		iconHolder.style.cssFloat = "left";
		
		
		
		
		mainDiv.appendChild(iconHolder);
		
		iconHolder.addEventListener("dragstart", function(ev)
		{
			var dt = ev.dataTransfer; //dataTransfer对象来传输数据，以便在拖曳操作结束的时候对数据进行其他的操作。
			dt.setData("text/plain",ev.currentTarget.id); 
			//currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口
			},false);
		
		
		iconHolder.addEventListener("dragover", function(ev) {               
			ev.preventDefault();
		}, false);
		
		iconHolder.addEventListener("drop",function(ev){
			var dt = ev.dataTransfer;
			var srcIconHolderId = dt.getData("text/plain"); //获取原对象id
			var srcIconHolder = document.getElementById(srcIconHolderId); //获取原对象图标
			
			
			if(ev.currentTarget.firstChild && ev.currentTarget.firstChild.id == "recycleBin" && srcIconHolder.firstChild.id != "recycleBin"){
				srcIconHolder.innerHTML = "";  //如果目标对象存在，并且目标对象是回收站，原对象不是回收站的时候将图标删除
				deleteFile(srcIconHolder.id);
				
				
			}
			else if(ev.currentTarget.firstChild){ //目标对象存在的话就和原对象交换位置
				var temp =  ev.currentTarget.firstChild;
				ev.currentTarget.appendChild(srcIconHolder.firstChild);   
				srcIconHolder.appendChild(temp);
			}else{	//目标对象不存在，则直接拖拽到该位置
				ev.currentTarget.appendChild(srcIconHolder.firstChild);
			}
			
			ev.preventDefault();
			ev.stopPropagation();//不再派发事件。

			},false);
		
		iconHolder.onclick =  function(ev){  //图标单击事件
			if(ev.currentTarget.firstChild){
				openApp(ev.currentTarget.firstChild.id);
				ev.stopPropagation();
			}
		};
		
		iconHolder.oncontextmenu =  function(ev)  //图标右击事件
		{
			if(ev.currentTarget.firstChild){
				openAppContextMenu(ev.currentTarget.firstChild.id, ev);
				ev.stopPropagation();
			}
		
			return false;
		};
		
		
	}
	
	
	
	
	
	}

