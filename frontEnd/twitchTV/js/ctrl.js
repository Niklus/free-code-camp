'use strict';

/* ======= Controller ======= */

var ctrl = {
	
	init: function() {
       
    // Initialize data
    model.init(); 

    // then init view once data has loaded
    setTimeout(view.init,1500); 
	},

  search: function(val){
    model.search(val);
  },

  renderAll: function(){
    model.renderAll();
  },
  
  renderOnline: function(){
    model.renderOnline();
  },

  renderOffline: function(){
    model.renderOffline();
  },

  render: function(data){
    view.render(data);
  },
};

// Bam!
ctrl.init();