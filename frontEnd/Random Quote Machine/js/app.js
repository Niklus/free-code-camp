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
    $quote.html('');
    $author.html('');       
    $quote.append(res.quoteText? res.quoteText : 'Error, please try again');
    $author.append(res.quoteAuthor? res.quoteAuthor : 'Anonymous');   
    $quote.attr('cite', res.quoteLink? res.quoteLink : '#');
    $('a').attr('href', res.quoteAuthor? "https://en.wikipedia.org/wiki/"+res.quoteAuthor : '#');
  }

  getQuote();

  $('#getQuoteBtn').on('click',function(){    
    $blockquote.fadeOut(1200,getQuote); 
    $blockquote.fadeIn(1200);
  });
};

$(document).ready(main);