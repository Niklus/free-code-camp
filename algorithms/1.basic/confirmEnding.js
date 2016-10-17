// Check if a string ends with the given target string.
// Do not use built-in method .endsWith()

function confirmEnding(str, target) {

  	for(var i = -1; i >= -target.length; i--){
	
		if(str.substr(str.length+i) !== target.substr(target.length+i)){
			return false;
		}
  	}
  return true;
}

confirmEnding("Bastian", "n");