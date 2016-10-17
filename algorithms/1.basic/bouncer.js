// Remove all falsy values from an array

function bouncer(arr) {
  
	function notFalsy(value) {
		return value;
	}

	return arr.filter(notFalsy);
}

bouncer([7, "ate", "", false, 9]);