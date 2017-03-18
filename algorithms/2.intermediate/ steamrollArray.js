/*
Flatten a nested array, account for varying levels of nesting.
*/

function steamrollArray(arr) {
  
  // Not elegant but Works --fix it
	const flatten = arr => arr.reduce(
  		(acc, val) => acc.concat(
    		Array.isArray(val) ? flatten(val) : val
  		),
  		[]
	);
    
  return flatten(arr)
  
}

steamrollArray([1, [2], [3, [[4]]]]);
