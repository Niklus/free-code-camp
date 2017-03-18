/*
Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.
*/


function dropElements(arr, func) {
  
  var myArr = [];
  
  arr.map(func).forEach(function(el,i){
    if(el) myArr.push(i);
  });
  
  if(myArr.length !== 0) return arr.splice(myArr[0]);
  
  return myArr;
}

dropElements([1, 2, 3], function(n) {return n < 3; });
