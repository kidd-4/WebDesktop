// JavaScript Document
//func can be got from server by using Ajax and executed by using eval(funcScript) 
function callfunc(funcName){
	alert(funcName);
}

//视频拖拽支持
function addDragSupport(dropbox){

	document.addEventListener("dragenter", function(e){ 
		//e.currentTarget.style.borderColor = 'gray'; 
	}, false); 
	
	document.addEventListener("dragleave", function(e){ 
		//e.currentTarget.style.borderColor = 'silver'; 
	}, false); 

	dropbox.addEventListener("dragenter", function(e){ 
		//e.currentTarget.style.borderColor = 'gray'; 
		//e.currentTarget.style.backgroundColor = 'white'; 
	}, false); 
	dropbox.addEventListener("dragleave", function(e){ 
		//e.currentTarget.style.backgroundColor = 'transparent'; 
	}, false); 
	dropbox.addEventListener("dragenter", function(e){ 
	    e.stopPropagation(); 
	    e.preventDefault(); 
	}, false); 
	dropbox.addEventListener("dragover", function(e){ 
	    e.stopPropagation(); 
	    e.preventDefault(); 
	}, false); 
	dropbox.addEventListener("drop", function(e){ 
		handleFiles(e.dataTransfer.files, e.currentTarget, e); 
		//handleFiles 函数说明了如何对拖拽的文件进行处理
	    e.stopPropagation(); 
	    e.preventDefault();  
	    //submit.disabled = false; 			     	       
	}, false);  	
}


