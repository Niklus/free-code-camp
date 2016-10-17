/*
	Return the symmetric difference of the two arrays.
*/

function diffArray(arr1, arr2) {
  
	var newArr =  [];

	for(var i = 0; i<arr1.length; i++){
		for(var j = 0; j<arr2.length; j++){
			if(arr1[i]==arr2[j]){
				delete arr2[j];
				delete arr1[i];
			}
		}
	}

	var concatedArr = newArr.concat(arr1, arr2);
  
	function returnValue(value){
		return value;
	}
  
  	var filtered = concatedArr.filter(returnValue);
  	
  	return filtered;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);