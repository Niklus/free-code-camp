// Translate the provided string to pig latin.

function translatePigLatin(str) {

	var vowels = ['a','e','i','o','u'];
	var newStr = str.split('');
	
	var spliced;
		
	newStr.forEach(function(char, i){
		vowels.forEach(function(vowel){
		  	if(char == vowel){
		  		spliced = newStr.splice(i);
		  	}
		});
	});
	
	newStr = spliced.concat(newStr).join('')+'ay';
	
	vowels.forEach(function(el){
	  if(el == str.charAt(0)){
	     newStr = str+'way';	
	  }
	});
  
    return newStr;
}

translatePigLatin("consonant");