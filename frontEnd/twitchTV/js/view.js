'use strict';

/* ======= View ======= */

var view = {

  init: function() {
    
    $('#search').on('keypress', function (event) {      
      
      var channel = $(this).val();
      
      if(event.keyCode === 13 && channel){                
        ctrl.search(channel);  
        $(this).val('');
      }
    });

    $('#all').on('click', function (event) {  
      ctrl.getAll();
    });

    $('#online').on('click', function (event) {
      ctrl.getOnline();
    });

    $('#offline').on('click', function (event) {
      ctrl.getOffline();
    }); 

    ctrl.getAll();  
  },

  render: function(data) {

    
    var channels = $('.list-group').html('');

    data.forEach(function(obj){

      var list = $('<li>').attr('class','list-group-item');
      var container = $('<div>').attr('class','container');
      var media = $('<div>').attr('class','media');
      var styleLink = $('<a>').attr('class', 'media-left');
      
      var trueLink = $('<a>').attr({  
        href:  obj.stream ? obj.stream.channel.url : obj.url,
        target: '_blank'
      });

      var img = $('<img>').attr({
        src: obj.stream ? obj.stream.channel.logo : obj.logo,
        class: 'media-object',
        alt: 'channels logo'
      });

      var mediaBody = $('<div>').attr('class','media-body');
      var heading = $('<h4>').attr('class','media-heading');
      heading.text(obj.stream ? obj.stream.game : 'offline');

      var text = $('<p>');
          
      if(obj.status == 404){
        text.text(obj.message);
      }else if(obj.stream == null){
        text.text(obj.status? obj.status : '...');
      }else{
        text.text(obj.stream.channel.status);
      }

      styleLink.append(img);

      mediaBody.append(heading);
      mediaBody.append(text);

      media.append(styleLink);
      media.append(mediaBody);

      container.append(media);
      trueLink.append(container);
      list.append(trueLink);

      channels.append(list);
    });
  }
};