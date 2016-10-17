// Convert the given number into a roman numeral.

function convertToRoman(num) {
    
    var roman1s = 'I II III IV V VI VII VIII IX'.split(' ');
    var roman10s = 'X XX XXX XL L LX LXX LXXX XC'.split(' ');
    var roman100s = 'C CC CCC CD D DC DCC DCCC CM'.split(' ');
    var roman1000s = 'M MM MMM MMMM'.split(' ');

    var arr = num.toString().split('');
    var newArr =[];

    if (num < 10){
        newArr.push(roman1s[arr[0]-1]);
    }else if (num < 100){
        newArr.push(roman10s[arr[0]-1]);
        newArr.push(roman1s[arr[1]-1]);
    }else if (num < 1000) {
        newArr.push(roman100s[arr[0]-1]);
        newArr.push(roman10s[arr[1]-1]);
        newArr.push(roman1s[arr[2]-1]);
    }else{
        newArr.push(roman1000s[arr[0]-1]);
        newArr.push(roman100s[arr[1]-1]);
        newArr.push(roman10s[arr[2]-1]);
        newArr.push(roman1s[arr[3]-1]);
    }

    return newArr.join('');
}

convertToRoman(36);