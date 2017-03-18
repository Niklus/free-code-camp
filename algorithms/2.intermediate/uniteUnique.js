/*
Write a function that takes two or more arrays and returns a new array of unique values 
in the order of the original provided arrays.
*/

function uniteUnique(arr) {
 
  var newArr = [];

  for(var prop in arguments){
  	newArr.push(arguments[prop]);
  }
  
  return newArr.reduce(function(a, b) { 
  	return a.concat(b);
  },[]).filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });
  
}
