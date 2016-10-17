/*
Make a function that looks through an array of objects (first argument) 
and returns an array of all objects that have matching property and 
value pairs (second argument). 
*/

function whatIsInAName(collection, source) {
	
  var keys = Object.keys(source);

  for(var i = 0; i<collection.length; i++){
  
    var obj = collection[i];
    
  	keys.forEach(function(key){
  		
  		if(!obj.hasOwnProperty(key)){
  			delete collection[i];
  		}else if (obj[key]!==source[key]){
  			delete collection[i];
  		}
  	});
  }
  
  var filtered = collection.filter(function(val){
  	return val;
  });
  
  return filtered;
}