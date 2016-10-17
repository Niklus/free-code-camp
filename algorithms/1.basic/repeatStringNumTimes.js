// Repeat a given string (first argument) num times (second argument)

function repeatStringNumTimes(str, num) {
 
    var newStr = "";
 
  	for(var i = 1; i<=num; i++){
  		newStr += str;
  	}

  	return newStr; 
}

repeatStringNumTimes("abc", 3);