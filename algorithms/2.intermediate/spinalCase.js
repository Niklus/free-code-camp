/*
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/


function spinalCase(str) {
  
 return str.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[\s_]/g,'-').toLowerCase();
}

spinalCase('This Is Spinal Tap');
