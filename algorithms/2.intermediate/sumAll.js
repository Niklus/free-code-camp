/*
    We'll pass you an array of two numbers. Return the sum of 
    those two numbers and all numbers between them.
*/

function sumAll(arr) {
 
    var counter = 0;
    var max = Math.max.apply(null, arr);
    var min;

    arr.forEach(function(el){

        if(el < max){
            min = el;
        }

        counter += el;
    });

    for(var i = min+1; i<max; i++){
        counter += i;
    }

    return counter;
}

sumAll([1, 4]);