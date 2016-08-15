
var calc = {
      
   value: "0",  
   
   num: 0,  
   
   result: 0,

   insertValue: function(val){
      this.value += val;       //concatenate the string value
   },

   add: function (){
      this.num = parseInt(this.value); 
      this.result += this.num;
      this.value = "0";
      //viewResult();
   },

   viewResult: function(){
      this.add(); // returns the total
      console.log(this.result)
   },

   resetValues: function(){
      this.num = 0;
      this.result = 0;
   }
};

var handler = {

   insertValue: function(val){
      calc.insertValue(val)
   },

    add: function (){
      calc.add();
    },

   viewResult: function(){
      calc.viewResult();
   },

   resetValues: function(){
      calc.resetValues();
   }
};

var view = {

   viewResult: function(){

   },

   setUpEventListeners: function(){

      var button = document.querySelector(".buttons");  
      button.addEventListener('click',function(e){    
        handler.insertValue(e.target.value); 
      });

      var addButton = document.getElementById("addButton");   
      addButton.addEventListener('click',function(e){
        handler.add();
      });

      var equalButton = document.getElementById("equalButton");
      equalButton.addEventListener('click',function(e){    
        handler.viewResult();
        handler.resetValues();
      });
   }
};

view.setUpEventListeners();

