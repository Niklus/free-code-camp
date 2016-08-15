
var calculator = {
      
   value: "0",  
   
   num: 0,  
   
   result: 0,

   insertValue: function(val){
      this.value += val;       
      this.num = parseInt(this.value);
      console.log(this.num);
   },

   add: function (){ 

   },

   equalsTo: function(){
   


   },   

   subtract: function(){
   }, 

   multiply: function(){  
   },

   divide: function(){
   },

   viewResult: function(){
     
   },

   resetValues: function(){
      this.num = 0;
      this.result = 0;
   }
};

var handler = {

   insertValue: function(val){
      calculator.insertValue(val)
   },

   add: function (){
      calculator.add();
   },

   subtract: function(){
      calculator.subtract();
   },

   multiply: function(){
      calculator.multiply();
   },

   divide: function(){
      calculator.divide();
   },

   equalsTo: function (){
      calculator.equalsTo();
   },
};

var view = {

   viewResult: function(){

   },

   setUpEventListeners: function(){

      var button = document.querySelector(".buttons");  
      button.addEventListener('click',function(e){    
        handler.insertValue(e.target.value); 
      });

      var operators = document.querySelector(".operators");   
      operators.addEventListener('click',function(e){
        
         switch(e.target.id) {
         
           case "addition":
            handler.add();
           break;

           case "subtraction":
            handler.subtract();
           break;

           case "multiplication":
            handler.subtract();
           break;

           case "division":
            handler.divide();
           break;

           case "equation":
            handler.equalsTo();
           break;
  
           default:// do nothing
         }

      });
   }
};

view.setUpEventListeners();


