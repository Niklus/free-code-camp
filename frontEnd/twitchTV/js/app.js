'use strict';

/* ======= Model ======= */

var model = {
    
    data: [],
    
	init: function() {

		var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

        channels.forEach(function(channel){  
			
			var url = 'https://api.twitch.tv/kraken/channels/'+channel+'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';		
		    
		    $.getJSON(url, function(obj) {	
				model.data.push(obj);
		    });	
        });         
	},

	search: function(channel) {

		var url = 'https://api.twitch.tv/kraken/channels/'+channel+'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
        var data = [];
		
		$.getJSON(url, function(obj) {
	       data.push(obj);
	       view.render(data);
		});
	}
};


/* ======= Controller ======= */

var ctrl = {
	
	init: function() {
		
		model.init();
		view.init();		
	},

	updateView: function(){
		view.render(model.data);
	},

	search: function(val){
		model.search(val);
	}
};


/* ======= View ======= */

var view = {

	init: function() {

		
        // Initialize Event Listeners     
        var search = $('#search');
   		search.on('keypress', function (event) {
      	  var val = search.val();      
	      if(event.keyCode === 13 && val){               	
	       	ctrl.search(val);  
	        search.val('');
	      }
    	});

    	$('#fetch').on('click', function (event) {
    		ctrl.updateView();
    	});

    },

    render: function(data) {

        console.log(data);
        
        var channels = $('#channels').html('');

        data.forEach(function(obj){
	        
            var list = $('<li>');
            var img = $('<img>');


            var div1 = $('<div>').attr('class','demo-card-square mdl-card mdl-shadow--2dp');
            var div2 = $('<div>').attr('class','mdl-card__title mdl-card--expand');
            var game = $('<h2>').attr('class','mdl-card__title-text');
                game.text();

            div2.css('background','url('+obj.logo+')')

            var div3 = $('<div>').attr('class','mdl-card__supporting-text');
                div3.text(obj.status ? obj.status : 'offline');

            var div4 = $('<div>').attr('class','mdl-card__actions mdl-card--border');
            var link = $('<a>').attr({
            	class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
            	href: obj.url,
            	target: '_blank'
            });
            	link.text(obj.game ? obj.game : '...');


            div2.append(game);
            div4.append(link);
            div1.append(div2);
            div1.append(div3);
            div1.append(div4);
            list.append(div1);

            var spacer = $('<div>').attr('class','space');
            list.append(spacer);




            channels.append(list);
        });
    }
};

ctrl.init();

