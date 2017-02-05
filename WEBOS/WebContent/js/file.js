function handleFiles(files, dropbox, e) { 
	
	//alert(files.length);
	//alert(files);
	
	if(files.length == 0){
	        var dt = e.dataTransfer;
            var text = dt.getData("text/plain");
            var p = document.createElement("p");
            p.innerHTML += text;
            dropbox.appendChild(p);
            return; 
	}
	
    for (var i = 0; i < files.length; i++) { 
        var file = files[i]; 
        
       // if (!file.type.match("video/ogg")) { 
	     // continue; 
        //} 
   
        //var video = document.getElementById("video");    
        var fileProcessor = dropbox.firstChild;
        fileProcessor.classList.add("obj");
        fileProcessor.file = file; 
       
        var reader = new FileReader(); 
        reader.onload = (function(aFileProcessor) { return function(e) { aFileProcessor.src = e.target.result; }; })(fileProcessor); 
        reader.readAsDataURL(file); 
       
    }//for 
}

function initFiles(){
	if(openDatabase != undefined)	
		  db.transaction(function(tx) 
		    	    {
			  			tx.executeSql('CREATE TABLE IF NOT EXISTS TextFiles(idx INTEGER, title TEXT, content TEXT)',[]); 
			  			tx.executeSql('SELECT * FROM TextFiles', [], function(tx, rs) 
				    	        { 
			  						for(var i = 0; i < rs.rows.length; i++) 
			  						{ 
			  							createFileIcon(rs.rows.item(i).idx);  
			  						}
				    	        });  
		    	    }); 
}

function createFileIcon(fileId){
    var iconHolder;
    for(var i=1;i<=120;i++){		
    	iconHolder = document.getElementById('iconHolder' + i);
    	if(!iconHolder.firstChild ){
    		var text = document.createElement('img');
    		text.src = "images/text.gif";
    		text.id = fileId;
    	    iconHolder.appendChild(text);
    	    
    	    text.onclick =  function(ev){  
    			if(ev.currentTarget){
    				openApp('notebook');
    				
    				var saveHolder = document.getElementById('saveHolder');
					saveHolder.onclick  = function(){				
						var title = document.getElementById('title');		
						var content = document.getElementById('content');	
							createFile(fileId, title.value, content.value);		
						}; 	
    				
    				var openedFileId = ev.currentTarget.id;
    				if(openDatabase != undefined)	
    				    db.transaction(function(tx) 
    				    	    {    		    	
    				    			tx.executeSql('SELECT * FROM TextFiles', [], function(tx, rs) 
    				    	        { 
    				    	        	 for(var i = 0; i < rs.rows.length; i++) 
    				     	            {  	
    				     	            	//alert(rs.rows.item(i).idx);
    				    	        		 if((rs.rows.item(i).idx+"") == (openedFileId+"")){ 
    				    	        			 var title = document.getElementById('title');	
    				    	        			 var content = document.getElementById('content');
    				    	        			 title.value = rs.rows.item(i).title;
    				    	        			 content.value = rs.rows.item(i).content; 				 
    				    	        		 }        		 
    				     	            } 

    				    	        }); 
    				    	    }); 

    				ev.stopPropagation();
    			}
    		};
    	    
    	    break;
    	}
    }//for
}

function createFile(fileId, fileTitle, fileContent){
	//alert(fileTitle);
	//alert(fileContent);
	//alert(fileId);
	
	var idx = 1;
	var update = false;
	
	if(openDatabase != undefined)	
	    db.transaction(function(tx) 
	    	    {    	
	    			tx.executeSql('CREATE TABLE IF NOT EXISTS TextFiles(idx INTEGER, title TEXT, content TEXT)',[]); 
	    	        tx.executeSql('SELECT * FROM TextFiles', [], function(tx, rs) 
	    	        { 
	    	        	 for(var i = 0; i < rs.rows.length; i++) 
	     	            { 	
	    	        		 if(rs.rows.item(i).idx == fileId){
	    	        			    db.transaction(function(tx) 
	    	        			    	    {    	
	    	        			    	        tx.executeSql('UPDATE TextFiles SET title=?, content=? WHERE idx='+fileId, [fileTitle, fileContent], function(tx, rs) 
	    	        			    	        {   
	    	        			    	        	alert("update successfully");
	    	        			    	        });  
	    	        			    	    }); 
	    	        			    return;
	    	        		 }        		 
	     	            }    	        	 
	    	        	 if(rs.rows.length>0)
	    	        		 idx = rs.rows.item(rs.rows.length-1).idx + 1;
	    	        	 
	    	        			
	    	        	 db.transaction(
	    	        					function(tx) {				    	        						 
	    	        				        tx.executeSql('INSERT INTO TextFiles VALUES(?, ?, ?)', [idx, fileTitle, fileContent], function(tx, rs) 
	    	        				        {  
	    	        				            alert("save successfully: "+idx+"-"+fileTitle+"-"+fileContent);  
	    	        				            createFileIcon(idx);  
	    	        				        },  
	    	        				        function(tx, error) 
	    	        				        {  
	    	        				            alert(error.source + "::" + error.message);  
	    	        				        });  
	    	        				    }); 
	    	        });  
	    	    }); 
}//createFile()