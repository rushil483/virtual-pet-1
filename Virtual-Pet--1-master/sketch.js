//Create variables here
var Dog;
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
	//load images here
  Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(Dog);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  
}


function draw() {  
  background(46,139,87);

  if(foodS !== undefined){
    textSize(20);
    fill(255);
    text("Press UP ARROW KEY to feed Drago milk",50,50);
    text("Food Remaining :"+foodS,150,150);
  }

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

if (keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}

if(foodS === 0){
  foodS === 20;
}

  drawSprites();
  //add styles here
  
}



function readStock(data){
  foodS = data.val();
}

function writeStock(x)
{ if(x<=0){
  
  x=0; 
}else{
   x=x-1; 
  } 
  database.ref('/').update(
    { Food:x })
   }