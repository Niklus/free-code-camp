// rot13 cipher

function rot13(str) { 
  
	var newArr = [];
	var newChar;

	for(var i = 0; i<str.length; i++){
	 
		var charCode =  str.charCodeAt(i);

		if(charCode < 65 ){
			newChar = String.fromCharCode(charCode);
		}else if(charCode < 78) { 	
			newChar = String.fromCharCode(charCode+13);
		}else{  
			newChar = String.fromCharCode(charCode-13);
		}

		newArr.push(newChar);
	}

	return newArr.join('');
}

rot13("SERR PBQR PNZC");