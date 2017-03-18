/*
Closures.
Create a function that sums two arguments together. If only one argument is provided, 
then return a function that expects one argument and returns the sum.
*/

function addTogether(x, y) {
    
    if( (x && typeof x !== 'number') || (y && typeof y !== 'number')) return undefined;
 
	if(x && y) return x + y;
   
	return function(y){
	  if(y && typeof y !== 'number') return undefined;
	  return x + y;
	};
}

addTogether(2,3);
