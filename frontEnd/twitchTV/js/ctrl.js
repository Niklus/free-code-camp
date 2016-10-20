'use strict';

/* ======= Controller ======= */

var ctrl = {
  
  init: function() {
       
    // Initialize data
    model.init(); 
  },

  search: function(channel){
    model.getStreamData(channel,true);
  },

  getAll: function(){
    model.getAll();
  },
  
  getOnline: function(){
    model.getOnline();
  },

  getOffline: function(){
    model.getOffline();
  }
};

// Initialize
ctrl.init();