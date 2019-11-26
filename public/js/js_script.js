
function MenuItem(name, kcal, lact, glut) {
    this.name = name;
    this.kCalories = kcal;
    this.lactose = lact;
    this.gluten = glut;
    this.kcalInfo = this.name + " contains " + this.kCalories +" kcal.";
    this.allergInfo = allergenes();
}

function allergenes(){
  if(this.gluten==true || this.lactose==true){
    if(this.gluten==true && this.lactose==true){
    return ', contains gluten and lactose';
    }
    else if(this.gluten==true){
     return ', contains gluten';
    }
    else {
    return ', contains lactose';
    }
  }
}

var menu = [
new MenuItem("BaconBurger", 400,true,true),
new MenuItem("Cheeseburger", 350,true,true),
new MenuItem("VeganBurger", 200,false,true)
]

function showMenu(){
var text="<ul>"
	for (var i=0;i<menu.length;i++)
  {
  	text+="<li>"+menu[i].name+', '+menu[i].kCalories+' kCal'+ menu[i].allergInfo()+
    "</li>";
  }
  text+="</ul>";
  document.getElementById("show_menu").innerHTML=text;
}

showMenu()
