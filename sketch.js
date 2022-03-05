var PLAY = 1;
var END = 0;
var gameState = PLAY;

var road, roadImage, car;
var carImage, rockImage, rock;
var thingsGroup, barrier1, barrier2;
var rockG,restart,restartImage;
var score;

function preload() {
  roadImage = loadImage("road.png");
  carImage = loadImage("car1.png");
  rockImage = loadImage("rock.jpg");
  oilImage = loadImage("oil.jpg")
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 600);

  rockG=new Group();

  road = createSprite(300, 300);
  road.addImage(roadImage);
  
  road.scale=0.5

  car = createSprite(300, 500, 20, 20);
  car.addImage("car", carImage);
  car.scale = 0.2;

  barrier1 = createSprite(width / 1, height / 2, 100, 600)
  barrier1.shapeColor = ("blue");
  barrier1.visible = false
  

  barrier2 = createSprite(width / 20, height / 2, 80, 600)
  barrier2.shapeColor = ("blue");
  barrier2.visible = false


  
  restart = createSprite(300, 300);
  restart.addImage(restartImage);
  restart.scale = 0.7;

  score= 0
}




function draw() {
  background(180);
 
  
  if(gameState===PLAY){
    
    score = score + Math.round(frameCount/70);

    road.velocityY = +(4+score/1000);
    

    if(keyDown(LEFT_ARROW)){
      car.x=car.x-20;
    }

    if(keyDown(RIGHT_ARROW)){
      car.x=car.x+20;
    }
  
    console.log(road.y)
  
    if (road.y > 1200) {
      road.y = 1
    }

    spawnRock()

    restart.visible=false;

    

    if (car.isTouching(rockG)){
      gameState=END
    }
  
    
  }

 if(gameState===END){
   road.velocityY=0;
   rockG.destroyEach();
   restart.visible=true;

   if(mousePressedOver(restart)){
     reset()
   }
   
 }
 car.collide(barrier1)
 car.collide(barrier2)
 rockG.collide(barrier1)
 rockG.collide(barrier2)
  drawSprites();
  text("Score: "+score,450,100)
}

function spawnRock() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var rock = createSprite(Math.round(random(100, 550)));
    rock.addImage(rockImage)
    rock.scale=0.5
    rock.shapeColor = ("blue");
    rock.velocityY = +(5 + score/1000);
    rockG.add(rock);

  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  road.velocityY=5;
  rockG.destroyEach();
  
score = 0;
  
}
