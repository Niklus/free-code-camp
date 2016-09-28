'use strict';

/* ======= Controller ======= */

var ctrl = {
	
	init: function() {
       
    // Initialize data
    model.init(); 

    // Just a sec to initialize data
    setTimeout(view.init,1500); 
	},

  search: function(val){
    model.search(val);
  },

  render: function(data){
      view.render(data);
  },

  renderAll: function(){
    model.renderAll();
  },
  
  renderOnline: function(){
    model.renderOnline();
  },

  renderOffline: function(){
    model.renderOffline();
  }
};

// Bam!
ctrl.init();