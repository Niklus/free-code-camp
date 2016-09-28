'use strict';

/* ======= Model ======= */

var model = {
    
  data: [],

  getData: function(channel,searchData){

    var streams = 'https://api.twitch.tv/kraken/streams/'+channel
      +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    var channels = 'https://api.twitch.tv/kraken/channels/'+channel
      +'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
    
    var modelData = this.data;
    
    // Check if Streaming
    $.getJSON(streams, function(streamData) {
        
      // If not streaming get the channels data
      if(streamData.stream==null){  
          
        $.getJSON(channels, function(channelData) { 
            
          if(searchData){ // If searched, render directly
            
            searchData.push(channelData);
            ctrl.render(searchData);

          }else{ // Else store in model.data

            modelData.push(channelData);
          }
        });           
      }else{ // Else use the streaming data  

        if(searchData){
            searchData.push(streamData);
            ctrl.render(searchData);
        }else{
            modelData.push(streamData);
        }           
      }
    });
  },
    
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
      model.getData(channel);
    });     
	},

	search: function(channel) {

    var searchData = [];

    model.getData(channel,searchData);
	},

  renderAll: function() {

    ctrl.render(this.data);
  },

  renderOnline: function(){

    var data = [];

    this.data.forEach(function(obj){
      if(obj.stream){
          data.push(obj);
      }
    })

    ctrl.render(data);
  },

  renderOffline: function(){
      
    var data = [];

    this.data.forEach(function(obj){
      if(obj.stream == null){
          data.push(obj);
      }
    })

    ctrl.render(data);
  }
};