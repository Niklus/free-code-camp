// Find Longest Word in a String

function findLongestWord(str) {
 
	var strArr = str.split(' ');  

	for(var i = 0; i < strArr.length; i++){
		 
		strArr[i] = strArr[i].length;
	}

	strArr.sort(function(a, b){  
		return a - b;
	});

	return strArr.pop();  
}

findLongestWord("The quick brown fox jumped over the lazy dog");