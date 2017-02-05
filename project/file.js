// JavaScript Document

//handleFiles 函数说明了如何对拖拽的文件进行处理
function handleFiles(files, dropbox, e) { 
	
	//alert(files.length);
	//alert(files);
	// 若文件不存在，则用相应文本代替
	if(files.length == 0){
	        var dt = e.dataTransfer;
            var text = dt.getData("text/plain");
            var p = document.createElement("p");
            p.innerHTML += text;
            dropbox.appendChild(p);
            return; 
	}
	
	//向 fileprocessor( 这里是视频标签 ) 添加文件，然后利用 FileReader 读取文件内容至 fileprocessor 进行处理。
    for (var i = 0; i < files.length; i++) { 
        var file = files[i]; 
        
       // if (!file.type.match("video/ogg")) { 
	     // continue; 
        //} 
   
        //var video = document.getElementById("video");    
        var fileProcessor = dropbox.firstChild;
        fileProcessor.classList.add("obj");
        fileProcessor.file = file;  // 添加文件
       
        var reader = new FileReader(); 
        reader.onload = (function(aFileProcessor)// 读取文件内容
		 { 
		 return function(e) 
		 { 
		 aFileProcessor.src = e.target.result; 
		 }; 
		 }
		 )(fileProcessor); 
        reader.readAsDataURL(file); 
       
    }//for 
}

function initFiles(){ //刷新之后仍然可以看到建立的文件
	if(openDatabase != undefined)	
		  db.transaction(function(tx) 
		    	    {
			  			tx.executeSql('CREATE TABLE IF NOT EXISTS TextFiles(idx INTEGER, title TEXT, content TEXT)',[]); 
			  			tx.executeSql('SELECT * FROM TextFiles', [], function(tx, rs)  //result：查询出来的数据集
				    	        { 
			  						for(var i = 0; i < rs.rows.length; i++)
		//rows 是数据集的“行”. rows 有两个属性：length、item.故,获取查询结果的某一行某一列的值 ：result.rows[i].item[fieldname]  
			  						{ 
			  							createFileIcon(rs.rows.item(i).idx);  //为数据库中已有的text建立图标
			  						}
				    	        });  
		    	    }); 
}

function createFileIcon(fileId){
    var iconHolder;
    for(var i=1;i<=120;i++){	// 查询第一个为空的位置	
    	iconHolder = document.getElementById('iconHolder' + i);
    	if(!iconHolder.firstChild ){
    		var text = document.createElement('img');
    		text.src = "images/text.png";
    		text.id = fileId;
    	    iconHolder.appendChild(text);
    	    
    	    text.onclick =  function(ev){  
    			if(ev.currentTarget){
    				openApp('notebook');// 打开记事本应用程序
    				
    				var saveHolder = document.getElementById('saveHolder');
					saveHolder.onclick  = function(){				
						var title = document.getElementById('title');		
						var content = document.getElementById('content');	
							createFile(fileId, title.value, content.value);	// 创建文本文档	
						}; 	
    				
    				var openedFileId = ev.currentTarget.id;
    				if(openDatabase != undefined)	
    				    db.transaction(function(tx) // 查询数据库，显示文档内容
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
	var update = false;//false 表示新建，true 表示修改
	
	if(openDatabase != undefined)	
	    db.transaction(function(tx) 
	    	    {    	
	    			tx.executeSql('CREATE TABLE IF NOT EXISTS TextFiles(idx INTEGER, title TEXT, content TEXT)',[]); 
	    	        tx.executeSql('SELECT * FROM TextFiles', [], function(tx, rs) 
	    	        { 
	    	        	 for(var i = 0; i < rs.rows.length; i++)  // 若文档存在，则修改它
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
	    	        	 if(rs.rows.length>0)// 若文档不存在，则新建一个文档 
	    	        		 idx = rs.rows.item(rs.rows.length-1).idx + 1;
	    	        	 
	    	        			
	    	        	 db.transaction(function(tx) {				    	        						 
	    	        		tx.executeSql('INSERT INTO TextFiles VALUES(?, ?, ?)', [idx, fileTitle, fileContent], 										                                             function(tx, rs) 
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


function deleteFile(fileId){

db.transaction(function(tx){
	var fileID = fileId.replace(/[^0-9]/ig,"");
	
tx.executeSql('delete from TextFiles where idx= ?',[fileID-1],function(tx,rs){ //1.这里有问题，不应该将fileID-1当做idx,因为建立图标时是从2开始，中间有默认图标的占位，而数据库的建立是从1开始，所以当建立到17个图标时会出现问题 2.不可以刷新之后再删除，因为div的位置发生改变，而id没有改变

alert("delete " + fileID +" successfully");

}
);

	
});











}

