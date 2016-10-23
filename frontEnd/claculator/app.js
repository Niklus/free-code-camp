var model = {
		
	init: function(){

		this.values = [];
	},

	addNumber: function(val){
		model.values.push(val);
		this.eval();
	},

	addOperator: function(){
		model.values.push(val);
		this.eval();
	}

	eval: function(){
		var values = this.values.join('');
		this.result = eval(values);
	},

	reset: function(){
		this.values.length = 0;
	}
};

var ctrl = {

	init: function(){
		view.init();
		model.init();
	},

	addNumber: function(val){
		model.addValue(val);
		view.render();
	},

	eval: function(){
		model.eval();
		view.render();
	},

	getResult: function(){
		return model.result;
	}
};

var view = {

	init: function(){
		
		$('button').on('click', function(e){
			if(e.target.value !== '='){
				ctrl.addValue(e.target.value);
			}else{
				ctrl.eval();
			}
		});

		this.input = $('<input>');

		this.render();
	},

	render: function(){

		var val = ctrl.getResult();

        this.input.attr('value',val);

		$('#display').html('').append(this.input);	
	}
};

ctrl.init();