/*
  Return the remaining elements of an array after 
  chopping off n elements from the head.
*/

function slasher(arr, howMany) {
	arr.splice(0,howMany);
	return arr;
}

slasher([1, 2, 3], 2);
