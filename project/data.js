// JavaScript Document

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
	{appId: "computer",    appName: "computer",    img: "images/computer.png",    position: 1,  contextMenu: [{name: "open", action: "openApp('computer')"}]},
	{appId: "calendar",     appName: "calendar",   img: "images/calendar.png",    position: 16, contextMenu: [{name: "open", action: "openApp('calendar')"}]},
	{appId: "recycleBin",  appName: "recycleBin",  img: "images/recycleBin.png",  position: 31, contextMenu: [{name: "open", action: "openApp('recycleBin')"}, {name: "empty recycleBin", action: "callfunc('EmptyRecycleBin')"}]},
	{appId: "videoPlayer", appName: "videoPlayer", img: "images/videoPlayer.png", position: 46, contextMenu: [{name: "open", action: "openApp('videoPlayer')"}]},
	{appId: "notebook",    appName: "notebook",    img: "images/notebook.png",    position: 61, contextMenu: [{name: "open", action: "openApp('notebook')"}]}		
];


//defaultAppScripts//-------------------------------------------------------------------------
///mask:打开app时将其他地方遮盖起来的div
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
				"	video.src ='video/1.mp4';						"+
				"	video.width  = 500;								"+
				"	video.height = 400;								"+
				"	video.controls = 'controls';					"+
				"	video.className = 'video';						"+
				"	appHolder.appendChild(video);					"+ 
				"	addDragSupport(appHolder);						"+	
				
				closeHolderScript 									 +
				"	closeHolder.style.marginTop = '-370px' ;		"+	
				"	closeHolder.style.marginRight = '-30px';		"
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
		
	},
	{
		appId: "computer",
		script: maskScript                                                 +
		appHolderScript                                                    +
		"	appHolder.className = 'computer';			                   "+
		" var html = '<div onclick=\"openDiscFile()\"><img src=\"images/disc1.png\"   /></div>';        "+
		"	html	 += '<div  ><img src=\"images/disc2.png\"/></div>'; 	   "+
		"	html	 += '<div ><img src=\"images/disc3.png\"/></div>'; 	   "+
		"	html	 += '<div ><img src=\"images/disc4.png\"/></div>'; 	   "+
		
		" appHolder.innerHTML = html;	                                   "+
		
		closeHolderScript 									         +				
				"	closeHolder.style.marginTop = '-70px';			"+	
				"	closeHolder.style.marginRight = '-50px';		" 
		
	},
	{
		appId: "calendar",                                                  
		script: maskScript                                                   +
		appHolderScript                                                      +
		"window.open('http://localhost/project-1-1.php');                    "
		
		
		
		
	}
	
];





