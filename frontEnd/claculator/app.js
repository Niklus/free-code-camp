var model = {
		
	init: function(){
		this.values = [];
	},

	addNumber: function(val){
		this.values.push(val);
	},

	addOperator: function(op){
		this.values.push(op);
	},

	eval: function(){
		var values = this.values.join('');
		this.result = eval(values);
		this.allClear();
	},

	allClear: function(){
		this.values.length = 0;
	}
};

var ctrl = {

	init: function(){
		view.init();
		model.init();
	},

	addNumber: function(val){
		model.addNumber(val);
		view.renderValues();
	},

	addOperator: function(op){
		model.addOperator(op);
		view.renderValues();
	},

	eval: function(){
		model.eval();
		view.renderResult();
	},

	getValues: function(){
		return model.values;
	},

	getResult: function(){
		return model.result;
	},

	allClear: function(){
		model.allClear();
		view.renderValues();
		view.renderResult();
	}
};

var view = {

	init: function(){
		
		$('button').on('click', function(e){

			switch(e.target.value) {
			    case '=':
			        ctrl.eval(e.target.value);
			        break;
			    case '+'||'-'||'/'||'*':
			        ctrl.addOperator(e.target.value);
			        break;
			    case 'allClear':
			        ctrl.allClear();
			        break;
			    default:
			        ctrl.addNumber(e.target.value);
			}
		});

		this.inputDiv = $('#input');
		this.input = $('<input>');
		this.resultDiv = $('#result');
		this.result = $('<div>');
		this.renderValues();
		this.renderResult();
	},

	renderValues: function(){

		var values = ctrl.getValues();
		
		values = values? values.join('') : '0';
        
        this.input.attr('value',values);
		this.inputDiv.html('').append(this.input);	
	},

	renderResult: function(){

		var result = ctrl.getResult();

		this.result.text(result||'0');
		this.resultDiv.html('').append(this.result);
	}
};

ctrl.init();