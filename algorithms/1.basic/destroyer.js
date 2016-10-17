/*
	Provided with an initial array (the first argument in the destroyer function), 
	followed by one or more arguments. Remove all elements from the initial array 
	that are of the same value as these arguments.
*/

function destroyer(arr) {

	var newArr = []; //arguments array

	for(var i = 1; i<arguments.length; i++){
	   newArr.push(arguments[i]);
	}

	for(var j = 0; j<newArr.length; j++){
		for(var k = 0; k<arr.length; k++){
			if(newArr[j]===arr[k]){
				delete arr[k];				 
			}
		}
	}

	function removeFalseVal(value){
		return value;
	}

	var filtered = arr.filter(removeFalseVal);
	
	return filtered;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);