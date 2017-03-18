/*
Check if the predicate (second argument) is truthy on all elements of a collection (first argument).
*/

function truthCheck(collection, pre) {
  return collection.map(function(el){
  	if(el[pre]) return true;
  		return false;
  }).every(function(el){
  	return el === true;
  });
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");
