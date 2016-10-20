'use strict';

/* ======= Model ======= */

var model = {
    
  data: [],
  
	init: function() {
        
    // Placeholder Channels
		var channels = [        
      'Nightblue3',
      'ESL_SC2', 
      'OgamingSC2', 
      'cretetion',
      'syndicate',
      'riotgames', 
      'storbeck',
      'comster404',
      'freecodecamp',  
      'habathcx', 
      'RobotCaleb', 
      'noobs2ninjas'
    ];

    channels.forEach(function(channel){  
      model.getStreamData(channel);
    });    
	},
  
  getStreamData: function(channel,searched){
     
    var streams = 'https://api.twitch.tv/kraken/streams/'+channel
    +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    $.getJSON(streams, function(data) {     
        
      // If not streaming, get channels data
      if(data.stream==null){
        model.getChannelData(channel,searched);
      } else{
        model.handleData(data,searched);
      }    
    });
  },

  getChannelData: function(channel,searched){

    var channels = 'https://api.twitch.tv/kraken/channels/'+channel
    +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    $.getJSON(channels, function(data) {     
      model.handleData(data,searched);     
    });
  },

  handleData: function(data,searched) {
  
    if(searched){ 
      var result = [];
      result.push(data);
      view.render(result);  
    }else{
      this.data.push(data);
      view.init();
    }
  },

  getAll: function() {
    view.render(this.data);
  },

  getOnline: function(){

    var data = [];
    this.data.forEach(function(obj){
      if(obj.stream){
        data.push(obj);
      }
    });
    view.render(data); 
  },

  getOffline: function(){
      
    var data = [];
    this.data.forEach(function(obj){
      if(obj.stream == null){
        data.push(obj);
      }
    });
    view.render(data);
  }
};



