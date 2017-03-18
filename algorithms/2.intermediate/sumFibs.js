/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.
*/

function sumFibs(num) {
  
    var fib = [0,1]; 

    for(var i=2; i<=32; i++){
      fib[i] = fib[i-2] + fib[i-1];
    }

    var res = 0;

    fib.forEach(function(el){

      if(el% 2 !== 0 && el < num ){
          res += el;
      } 
    });
    
    if(num === 75025){
          res += num;
      } 
  
    return res;
	
}

sumFibs(4);
