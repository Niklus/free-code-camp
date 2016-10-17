// Return Largest Numbers in Arrays

function largestOfFour(arr) {

 	for(var i = 0; i < arr.length; i++){
  	
		var sortedArr = arr[i].sort(function(a, b){
			return a-b;
		});

		arr[i] = sortedArr.pop();
	}

	return arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);