'use strict';

var main = function(){

  var $quote = $('#quote');
  var $author = $('#author');
  var $blockquote = $('blockquote');
  var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

  function getQuote(){  
    $.ajax({ 
      url: url, 
      dataType: "jsonp",  
      success: addQuote
    });
  }

  function addQuote(res) {  
    
    // Clear and append new quote and author    
    $quote.html('').append(res.quoteText? res.quoteText : 'Error, please try again');
    $author.html('').append(res.quoteAuthor? res.quoteAuthor : 'Anonymous'); 
    
    // Set links  
    $quote.attr('cite', res.quoteLink? res.quoteLink : '#');
    $('#authorLink').attr('href', res.quoteAuthor? "https://en.wikipedia.org/wiki/"+res.quoteAuthor : '#');
    $('#tweet').attr('href','https://twitter.com/intent/tweet?text='+res.quoteText+' -'+res.quoteAuthor+' #Quotes'); 
  }

  $('#newQuotebtn').on('click',function(){    
    $blockquote.fadeOut(1200,getQuote); 
    $blockquote.fadeIn(1200);
  });

  getQuote();
};

$(document).ready(main);