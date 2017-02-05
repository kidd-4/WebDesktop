function addLoginHistory(){
	var time = new Date().getTime();  
	var action = "login WEBOS"; 
	var details = "login user: " + username; 
	addHistory(time, action, details); 	
}

//History can also be added to the server by using Ajax
function addHistory(time, action, details){ 
	if(openDatabase != undefined)
	db.transaction(
			function(tx) {			
				tx.executeSql('CREATE TABLE IF NOT EXISTS History(time INTEGER, action TEXT, details TEXT)',[]);  
		        tx.executeSql('INSERT INTO History VALUES(?, ?, ?)', [time, action, details], function(tx, rs) 
		        {  
		            //alert("save successfully: "+time+"-"+action+"-"+details);   
		        },  
		        function(tx, error) 
		        {  
		            alert(error.source + "::" + error.message);  
		        });  
		    });  
}

//History can also be got from the server by using Ajax
function viewHistory(){
	var mask = document.getElementById("mask"); 
	mask.style.display="block";
	mask.style.opacity = 0.8;

	var historyHolder = document.getElementById("historyHolder"); 
	historyHolder.style.display="block";
	historyHolder.style.opacity = 1;

	var closeHolder = document.getElementById('closeHolder');
	closeHolder.style.marginTop = "0px";
	closeHolder.style.marginRight = "0px";
	closeHolder.style.display= "block";
	closeHolder.style.opacity = 0.2;
	closeHolder.onmouseover = function(){closeHolder.style.opacity = 1;}; 
	closeHolder.onmouseout  = function(){closeHolder.style.opacity = 0.2;}; 
	
	closeHolder.onclick  = function(){
		closeHolder.style.display= "none";
		historyHolder.style.display="none";
		mask.style.display= "none";
	}; 

	var closeHolderForHistory = document.getElementById("closeHolderForHistory"); 
	closeHolderForHistory.appendChild(closeHolder);
	

	//show history
	var historyTable = document.getElementById("historyTable"); 
	
	historyTable.innerHTML = "";
	var th = document.createElement('thead');
	th.style = "color:#CC3300";
	var th1 = document.createElement('td');
	th1.align = "center";
    th1.width=300;
    th1.innerHTML = "Time";
	var th2 = document.createElement('td');
	th2.align = "center";
    th2.width=100;
    th2.innerHTML = "Action";	
    var th3 = document.createElement('td');
    th3.align = "center";
    th3.width=150;
    th3.innerHTML = "Details";	
    th.appendChild(th1);  
    th.appendChild(th2);  
    th.appendChild(th3);
    historyTable.appendChild(th);
               
    if(openDatabase != undefined)	
    db.transaction(function(tx) 
    	    {    	
    	        tx.executeSql('SELECT * FROM History', [], function(tx, rs) 
    	        {  
    	            for(var i = 0; i < rs.rows.length && i<15; i++) 
    	            {     	               
    	                var tr = document.createElement('tr');
    	               
    	                var td1 = document.createElement('td');
    	                td1.style.paddingLeft = "3px";
    	                td1.style.paddingRight = "3px";
    	                
    	                var t = new Date();  
    	                t.setTime(rs.rows.item(i).time);  
    	                td1.innerHTML = t.toLocaleDateString()+" "+t.toLocaleTimeString();
 
    	                var td2 = document.createElement('td');  
    	                td2.style.paddingLeft = "3px";
    	                td2.style.paddingRight = "3px";
    	                td2.innerHTML = rs.rows.item(i).action; 

    	                 
    	                var td3 = document.createElement('td'); 
    	                td3.style.paddingLeft = "3px";
    	                td3.style.paddingRight = "3px"; 
    	                td3.innerHTML = rs.rows.item(i).details;  
    	                  
    	                tr.appendChild(td1);  
    	                tr.appendChild(td2);  
    	                tr.appendChild(td3);
    	                  
    	                historyTable.appendChild(tr);                   
    	            }  
    	        });  
    	    });  

}