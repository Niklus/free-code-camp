'use strict';

/* ======= View ======= */

var view = {

	init: function() {
  
    var search = $('#search');
 		search.on('keypress', function (event) {      
      if(event.keyCode === 13 && search.val()){               	
       	ctrl.search(search.val());  
        search.val('');
      }
  	});

  	$('#all').on('click', function (event) {
  		ctrl.renderAll();

  	});

      $('#online').on('click', function (event) {
          ctrl.renderOnline();
      });

      $('#offline').on('click', function (event) {
          ctrl.renderOffline();
      });

      ctrl.renderAll();
  },

  render: function(data) {
      
    var channels = $('.list-group').html('');

    data.forEach(function(obj){

      var list = $('<li>').attr('class','list-group-item');
      var container = $('<div>').attr('class','container');
      var media = $('<div>').attr('class','media');

      var link = $('<a>').attr({  
          href:  obj.stream ? obj.stream.channel.url : obj.url,
          class: 'media-left',
          target: '_blank'
      });

      var img = $('<img>').attr({
          src: obj.stream ? obj.stream.channel.logo : obj.logo,
          class: 'media-object',
          alt: 'Channels logo'
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

      link.append(img);

      mediaBody.append(heading);
      mediaBody.append(text);

      media.append(link);
      media.append(mediaBody);

      container.append(media);
      list.append(container);
      channels.append(list);
    });
  }
};