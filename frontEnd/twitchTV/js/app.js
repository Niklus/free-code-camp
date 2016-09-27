'use strict';

/* ======= Model ======= */

var model = {
    
    data: [],
    
	init: function() {
        
        // Popular channels
		var channels = [
            'syndicate',
            'riotgames',
            'Nightblue3',
            'ESL_SC2', 
            'OgamingSC2', 
            'cretetion', 
            'freecodecamp',  
            'habathcx', 
            'RobotCaleb', 
            'noobs2ninjas'
        ];

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

        //Initialize Ui elements

		
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
        
        var channels = $('.row').html('');

        // Render a Card for each object
        data.forEach(function(obj){

	        // Create Ellemnts
            var column = $('<div>').attr('class','col-lg-3 col-md-4 col-sm-6')

            var card = $('<div>').attr('class','card'); 
            
            var img = $('<img>').attr({
                class: 'card-img-top img-responsive' ,
                src: obj.logo,
                alt: 'Channels logo'
            });

            var details = $('<div>').attr('class','card-block card-inverse');
            var title = $('<h4>').attr('class','card-title');
                title.text(obj.game);

            var text = $('<p>').attr('class', 'card-text');
                text.text(obj.status ? obj.status : '...');
            
            var link = $('<a>').attr({
                href: obj.url,
                class: 'btn btn-primary',
                target: '_blank'
            });
                link.text(obj.name);    

            // Inner Div
            details.append(title);
            details.append(text);
            details.append(link);

            // Outer Div
            card.append(img);
            card.append(details);

            //Column Div
            column.append(card);
            

            // Row Div - Static
            channels.append(column);

        });
    }
};

ctrl.init();

