/*
  The DNA strand is missing the pairing element. 
  Take each character, get its pair, and return the results as a 2d array.
*/

function pairElement(str) {
  
  var arrStr = str.split('');                                                                                                                                                                                                                              
 
  for(var i = 0; i<arrStr.length; i++){

    switch (arrStr[i]) {
   
      case 'G':   
        arrStr.push(['G','C']);
        delete arrStr[i];
        break;

      case 'C':   
        arrStr.push(['C','G']);
        delete arrStr[i];
        break;

      case 'A': 
        arrStr.push(['A','T']);
        delete arrStr[i];
        break;

      case 'T':
        arrStr.push(['T','A']);
        delete arrStr[i];
        break;
      
      default:
        break;
    }
  }

  var filtered = arrStr.filter(function(val){
    return val;
  });
 
  return filtered;
}

pairElement("GCG");
