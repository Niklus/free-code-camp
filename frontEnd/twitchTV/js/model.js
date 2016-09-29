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
      model.getData(channel,false);
    });     
	},

	search: function(channel) {

    this.getData(channel,true);
	},
  
  getData: function(channel,searched){

    var streams = 'https://api.twitch.tv/kraken/streams/'+channel
      +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    var channels = 'https://api.twitch.tv/kraken/channels/'+channel
      +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    $.getJSON(streams, function(streamData) {
          
      if(streamData.stream == null){  

        $.getJSON(channels, function(channelData) {   
          
          model.dataHandler(channelData,searched);     
        });   
      }else{
        model.dataHandler(streamData,searched);         
      }
    });
  },

  dataHandler: function(data,searched) {
  
    if(searched){    
      var result = [];
      result.push(data);
      this.render(result);  
    }else{
      this.data.push(data);
    }
  },

  renderAll: function() {
    this.render(this.data);
  },

  renderOnline: function(){

    var data = [];

    this.data.forEach(function(obj){
      if(obj.stream){
        data.push(obj);
      }
    })

    this.render(data);
  },

  renderOffline: function(){
      
    var data = [];

    this.data.forEach(function(obj){
      if(obj.stream == null){
        data.push(obj);
      }
    })

    this.render(data);
  },

  render: function(data){
    ctrl.render(data);
  },
};