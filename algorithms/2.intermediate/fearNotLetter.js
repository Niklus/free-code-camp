//Find the missing letter in the passed letter range and return it.

function fearNotLetter(str) {
  
	var strArr = str.split('');
	var charCodes = [];

    for(var i = 0; i<strArr.length; i++){	
		var code = strArr[i].charCodeAt(0);
  		charCodes.push(code);
	}

	for(var j = 1; j<charCodes.length; j++){

        var currentCode = charCodes[j];
        var previousCode = charCodes[j-1];
  
		if(currentCode !== previousCode+1) {
			return String.fromCharCode(previousCode+1);
		}
	}
}

fearNotLetter("abce");