/*
	Convert the characters &, <, >, " (double quote), and ' (apostrophe), 
	in a string to their corresponding HTML entities.
*/

function convertHTML(str) {
	
   var arrStr = str.split('');
 
   for(var i =  0; i<arrStr.length; i++){
   		
        var char = arrStr[i];
     
		if(char ==  '&' ){
           arrStr[i] = '&amp;';
		}
		if(char ==  '<' ){
			arrStr[i] = '&lt;';
		}
		if(char ==  '>' ){
	    	arrStr[i] = '&gt;';
		}
		if(char ==  '"' ){
			arrStr[i] ='&quot;';
		}
		if(char ==  "'" ){
			arrStr[i] = '&apos;';
		}	
   }
   	
  return arrStr.join('');
}

convertHTML("Dolce & Gabbana");