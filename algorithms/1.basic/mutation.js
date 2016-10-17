/*
    Return true if the string in the first element 
    of the array contains all of the letters of the string 
    in the second element of the array.
*/

function mutation(arr) {
  
    var spliced = arr.splice(1,1);

    var str1 = arr[0].toLowerCase();
    var str2 = spliced[0].toLowerCase();

    var arr1 = str2.split('');
    var arr2 = str1.split('');

    for(var i = 0; i<arr1.length; i++){
        
        if((str1.indexOf(arr1[i]) !== -1) === false && (str2.indexOf(arr2[i]) !== -1) === false) { 
            return false;
        }
    }
    
    return true;
}

mutation(["hello", "hey"]);