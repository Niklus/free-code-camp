'use strict';

/* ======= View ======= */

var view = {

  init: function() {
    
    $('#search').on('keypress', function (e) {      
      
      var channel = $(this).val();
      
      if(event.keyCode === 13 && channel){                
        ctrl.search(channel);  
        $(this).val('');
      }
    });

    $('#all').on('click', function (e) {  
      ctrl.getAll();
    });

    $('#online').on('click', function (e) {
      ctrl.getOnline();
    });

    $('#offline').on('click', function (e) {
      ctrl.getOffline();
    }); 

    ctrl.getAll();  
  },

  render: function(data) {

    var channels = $('.list-group').html('');

    data.forEach(function(obj){  
      var list = view.createMediaList(obj);
      channels.append(list);
    });
  },

  createMediaList: function(obj) {

    var list = $('<li>').attr('class','list-group-item');
    var link = $('<a>').attr({  
      href:  obj.stream ? obj.stream.channel.url : obj.url,
      target: '_blank'
    });
    var container = $('<div>').attr('class','container');
    var media = this.createMedia(obj);

    container.append(media);
    link.append(container);
    list.append(link);
    return list;
  },

  createMedia: function(obj) {

    var media = $('<div>').attr('class','media');
    var styleLink = $('<a>').attr('class', 'media-left');
    var img = $('<img>').attr({
        src: obj.stream ? obj.stream.channel.logo : obj.logo,
        class: 'media-object',
        alt: 'channels logo'
    });
    styleLink.append(img);
    var mediaBody = this.createMediaBody(obj)

    media.append(styleLink);
    media.append(mediaBody);

    return media;
  },

  createMediaBody: function(obj) {

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

    mediaBody.append(heading);
    mediaBody.append(text);

    return mediaBody;
  }
};