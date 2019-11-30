
function MenuItem(name, kcal, lact, glut, img) {
    this.name = name;
    this.kCalories = kcal;
    this.lactose = lact;
    this.gluten = glut;
    this.kcalInfo ="Contains " + this.kCalories +" kcal.";
    this.allergInfo = function allergenes(){
      if(this.gluten==true || this.lactose==true){
        if(this.gluten==true && this.lactose==true){
        return 'Contains gluten and lactose';
        }
        else if(this.gluten==true){
         return 'Contains gluten';
        }
        else {
        return 'Contains lactose';
        }
      }
    };
    this.imgURL = img;
}


var menu = [
new MenuItem("BaconBurger", 400,true,true, "img/baconburger.jpg"),
new MenuItem("Cheeseburger", 350,true,true, "img/chickenburger.jpg"),
new MenuItem("VeganBurger", 200,false,true, "img/veganburger.jpg"),
new MenuItem("DoubleCheeseBurger", 400, true, true, "img/chickenburger.jpg")
]

var vm = new Vue({
  el: '#showmenu',
  data: {
    menuList: menu
    }

  })

function details(){
  this.name = document.getElementById('fullname').value;
  this.email = document.getElementById('emailadress').value;
  this.payment = document.getElementById('payment').value;
  this.gender = function radioSelect(){
    var radios = document.getElementsByName('gender');
    for (var i = 0, length = radios.length; i < length; i++)
    {
     if (radios[i].checked)
     {
      // do whatever you want with the checked radio
      return radios[i].value;

      // only one radio can be logically checked, don't check the rest
      break;
     }
    }
  }
  this.burgers = function (){
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value)
    }
    return array;
  }
}


/*var vm1 = new Vue({
      el: '#submit',
      methods: {
          markDone: function() {
              console.log("Order placed!");
              var currDetails = new details();
              console.log(currDetails);
              document.getElementById('showinfo').innerHTML=

                "<h2>"+'Order Details:'+"<h2>"+

                "<ul>"+
                  "<li>"+'Name: '+ currDetails.name+"</li>"+
                  "<li>"+'Email: ' + currDetails.email+"</li>"+
                  "<li>"+'Payment: '+ currDetails.payment+"</li>"+
                  "<li>"+'Gender: '+ currDetails.gender()+"</li>"+
                  "<li>"+'Burgers: '+ currDetails.burgers()+"</li>"
                "</ul>"
          },
        addOrder: function (event) {
          var offset = {x: event.getElementById('dots').getBoundingClientRect().left,
                        y: event.getElementById('dots').getBoundingClientRect().top};
          socket.emit("addOrder", { orderId: this.getNext(),
                                    details: { x: event.clientX - 10 - offset.x,
                                               y: event.clientY - 10 - offset.y },
                                    orderItems: currOrder.burgers
                                  })
        }
    }
  });*/

//MAP functionality

  'use strict';
  var socket = io();

  var vm2 = new Vue({
    el: 'main',
    data: {
      orders: {},
      location: {},
      currDetails: {}
    },
    created: function () {
      socket.on('initialize', function (data) {
        this.orders = data.orders;
      }.bind(this));
  
      socket.on('currentQueue', function (data) {
        this.orders = data.orders;
      }.bind(this));
    },
    methods: {
      displayOrder: function (event) {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        this.location= { x: event.clientX - 10 - offset.x,
                   y: event.clientY - 10 - offset.y};
        console.log(this.location.x +"  "+ this.location.y);
        },
      markDone: function() {
        console.log("Order placed!");
        this.currDetails = new details();
        console.log(this.currDetails);
        document.getElementById('showinfo').innerHTML=
          "<h2>"+'Order Details:'+"<h2>"+
          "<ul>"+
            "<li>"+'Name: '+ this.currDetails.name+"</li>"+
            "<li>"+'Email: ' + this.currDetails.email+"</li>"+
            "<li>"+'Payment: '+ this.currDetails.payment+"</li>"+
            "<li>"+'Gender: '+ this.currDetails.gender()+"</li>"+
            "<li>"+'Burgers: '+ this.currDetails.burgers()+"</li>"
         "</ul>"


      },
      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
      addOrder: function (event) {
        console.log(this.getNext());
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: this.location,
                                  orderItems: this.currDetails.burgers(),
                                  customerDetails: this.currDetails.name+", "+this.currDetails.email+", "+this.currDetails.payment, 
                                });
      },    
         
    }
  });