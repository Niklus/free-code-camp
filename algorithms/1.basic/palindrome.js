// Check for Palindromes

function palindrome(str) {
 
	var newStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); 

	var revStr = newStr.split('').reverse().join(''); 

	if(revStr === newStr){ 
		return true;
	}
	else{
		return false;
	}
}

palindrome("eye");