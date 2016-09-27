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
            'storbeck',
            'comster404',
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

        this.renderAll();    
	},

	search: function(channel) {

		var url = 'https://api.twitch.tv/kraken/channels/'+channel+'?&client_id=gj0milauq3wupklis0atg6g58h6ewz3&callback=?';
        var data = [];
		
		$.getJSON(url, function(obj) {
	       data.push(obj);
           ctrl.render(data);
		});

        
	},

    renderAll: function() {

        ctrl.render(this.data);
    },

    renderOnline: function(){

        var data = [];

        this.data.forEach(function(obj){
            if(obj.status !== null){
                data.push(obj);
            }
        })

        ctrl.render(data);
    },

    renderOffline: function(){
        var data = [];

        this.data.forEach(function(obj){
            if(obj.status == null){
                data.push(obj);
            }
        })

        ctrl.render(data);
    }
};


/* ======= Controller ======= */

var ctrl = {
	
	init: function() {
       
        model.init();
        view.init();    
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
    },

    addChannel: function() {

    }
};


/* ======= View ======= */

var view = {

	init: function() {

        //Initialize Ui elements

		
        // Initialize Event Listeners     
        var search = $('#search');
   		search.on('keypress', function (event) {      
	      if(event.keyCode === 13 && search.val()){               	
	       	ctrl.search(search.val());  
	        search.val('');
	      }
    	});

    	$('#all').on('click', function (event) {
    		ctrl.renderAll();
    	});

        $('#online').on('click', function (event) {
            ctrl.renderOnline();
        });

        $('#offline').on('click', function (event) {
            ctrl.renderOffline();
        });
    },

    render: function(data) {

        console.log(data);
        
        var channels = $('.list-group').html('');

        data.forEach(function(obj){

	        // Create Ellemnts
            var list = $('<li>').attr('class','list-group-item');
            var container = $('<div>').attr('class','container');
            var media = $('<div>').attr('class','media');

            var link = $('<a>').attr({
                href: obj.url,
                class: 'media-left',
                target: '_blank'
            });

            var img = $('<img>').attr({
                class: 'media-object' ,
                src: obj.logo,
                alt: 'Channels logo'
            });
            
            var mediaBody = $('<div>').attr('class','media-body');
            var heading = $('<h4>').attr('class','media-heading');
                heading.text(obj.game);
            var text = $('<p>').text(obj.status ? obj.status : '...');


            link.append(img);
            mediaBody.append(heading);
            mediaBody.append(text);

            media.append(link);
            media.append(mediaBody);

            container.append(media);
            list.append(container);
            channels.append(list);

        });
    }
};

// Bam!
ctrl.init();



