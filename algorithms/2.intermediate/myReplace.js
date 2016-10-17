/*
	Perform a search and replace on the sentence using the 
	arguments provided and return the new sentence.
*/

function myReplace(str, before, after) {
  
	var char = before.charAt(0);
	var charUpper = char.toUpperCase();
	var newStr;

	if (char == charUpper ) {		
		var newAfter = after.split('');
		newAfter[0] = newAfter[0].toUpperCase();
		newAfter = newAfter.join('');
		newStr = str.replace(before, newAfter);
	}else{ 
		newStr = str.replace(before, after);
	}

	return newStr;
}


myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
