function initDataBase(){
	if(openDatabase != undefined)
		db = openDatabase('MyData', '', 'My Database', 102400); 
}