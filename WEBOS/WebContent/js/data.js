//global data*********************************************************************************

//database//----------------------------------------------------------------------------------
var db;
var openDatabase;


//username//----------------------------------------------------------------------------------
var username;

//username = sessionStorage.getItem("username");
username = localStorage.getItem("username");

if(username == null)
	username = "offline user";

//alert("Welcome: " + username);



//default data********************************************************************************

//defaultApps//-------------------------------------------------------------------------------
var defaultApps = [
	{appId: "computer",    appName: "computer",    img: "images/computer.gif",    position: 1,  contextMenu: [{name: "open", action: "openApp('computer')"}]},
	{appId: "network",     appName: "network",     img: "images/network.gif",     position: 16, contextMenu: [{name: "open", action: "openApp('network')"}]},
	{appId: "recycleBin",  appName: "recycleBin",  img: "images/recycleBin.gif",  position: 31, contextMenu: [{name: "open", action: "openApp('recycleBin')"}, {name: "empty recycleBin", action: "callfunc('EmptyRecycleBin')"}]},
	{appId: "videoPlayer", appName: "videoPlayer", img: "images/videoPlayer.gif", position: 46, contextMenu: [{name: "open", action: "openApp('videoPlayer')"}]},
	{appId: "notebook",    appName: "notebook",    img: "images/notebook.gif",    position: 61, contextMenu: [{name: "open", action: "openApp('notebook')"}]}		
];


//defaultAppScripts//-------------------------------------------------------------------------
var maskScript =	"	var mask = document.getElementById('mask');	"+
					"	mask.style.display = 'block';				"+
					"	mask.style.opacity = 0.8;					";

var appHolderScript  =	"	var appHolder = document.getElementById('appHolder');	"+
						"	appHolder.innerHTML = '';								"+
						" 	appHolder.style.display='block';						"+
						" 	appHolder.style.opacity = 1;							";

var closeHolderScript = "	var closeHolder = document.getElementById('closeHolder');				"+
						"	closeHolder.style.display = 'block';									"+
						"	closeHolder.style.opacity = 0.2;										"+
						"	closeHolder.onmouseover = function(){closeHolder.style.opacity = 1;};	"+ 
						"	closeHolder.onmouseout  = function(){closeHolder.style.opacity = 0.2;};	"+
						
						"	closeHolder.onclick  = function(){										"+
						"		appHolder.style.display='none';										"+
						"		mask.style.display= 'none';											"+
						"		var hiddenHolder = document.getElementById('hiddenHolder');			"+
						"		var closeHolder = document.getElementById('closeHolder');			"+
						"		var saveHolder = document.getElementById('saveHolder');				"+
						"		hiddenHolder.appendChild(closeHolder);								"+
						"		hiddenHolder.appendChild(saveHolder);								"+
						"	}; 																		"+

						"	appHolder.appendChild(closeHolder);										";

var saveHolderScript =  "	var saveHolder = document.getElementById('saveHolder');					"+
						"	saveHolder.style.display = 'block';										"+
						"	saveHolder.style.opacity = 0.2;											"+
						"	saveHolder.onmouseover = function(){saveHolder.style.opacity = 1;};		"+ 
						"	saveHolder.onmouseout  = function(){saveHolder.style.opacity = 0.2;};	"+
						"	appHolder.appendChild(saveHolder);										";


var defaultAppScripts = [ 
	{
		appId:  "videoPlayer", 
		script: maskScript 										 	 + 
				appHolderScript 									 +
				"	appHolder.className = 'videoPlayerHolder';		"+
				
				"	var video = document.createElement('video');	"+
				"	video.id ='video';								"+
				"	video.src ='';									"+
				"	video.width  = 370;								"+
				"	video.height = 260;								"+
				"	video.controls = 'controls';					"+
				"	video.className = 'video';						"+
				"	appHolder.appendChild(video);					"+ 
				"	addDragSupport(appHolder);						"+	
				
				closeHolderScript 									 +
				"	closeHolder.style.marginTop = '60px';			"+	
				"	closeHolder.style.marginRight = '120px';		"
	}, {
		appId:  "notebook", 
		script: maskScript 										 	 +
				appHolderScript 									 +
				"	appHolder.className = 'notebookHolder';			"+
											
				"	var html  = '<table><tr valign=\"top\"><td><label for=title>Title</label></td>';		"+
				"	html	 += '<td><input name=title id=title type=text size=50 required/></td></tr>';	"+
				"	html	 += '<tr valign=\"top\"><td><label for=content>Content</label></td>';			"+
				"	html	 += '<td><textarea name=content id=content rows=15 cols=60 />';					"+				
				"	appHolder.innerHTML = html;																"+
				
				saveHolderScript 									 	 +				
				"	saveHolder.style.marginTop = '-325px';				"+				
				"	saveHolder.onclick  = function(){					"+
				"	var title = document.getElementById('title');		"+
				"	var content = document.getElementById('content');	"+
				" 		createFile(0, title.value, content.value);		"+
				"	}; 													"+
				
				closeHolderScript 									 +				
				"	closeHolder.style.marginTop = '-325px';			"+	
				"	closeHolder.style.marginRight = '-50px';		"
		
	}          
];





