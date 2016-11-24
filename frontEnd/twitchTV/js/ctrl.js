'use strict';

/* ======= Controller ======= */

var ctrl = {
  
  init: function() {
       
    // Initialize data
    model.init(); 

    // Then init view once data has loaded
    setTimeout(view.init,1500); 
  },

  search: function(channel){
    model.getData(channel,true);
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