// Truncate a string

function truncateString(str, num) {

    var newStr = "";

    if(num >= str.length){
        newStr = str.slice(0,num);
    }
    else if(num-3 >= 0){
        newStr = str.slice(0,num-3).concat('...');
    }
    else{
        newStr=str.slice(0,num).concat('...'); 
    }
    
    return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);