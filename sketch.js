var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(300,450,150,150)
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;

  invisibleBlockGroup = new Group();

  
  
}

function draw() {
  if(gameState == "play"){
  background(200);
  drawSprites();
  spawnDoors();
  spookySound.play();
  
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("SPACE")){
    ghost.velocityY = -6
  }
  if(keyDown("LEFT")){
    ghost.x = ghost.x -8;
  }
  if(keyDown("RIGHT")){
    ghost.x = ghost.x + 8;
  }
  ghost.velocityY = ghost.velocityY + 0.8;

  if(climbersGroup.isTouching(ghost)){

    ghost.velocityY = 0;

  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){

    gameState = "end";

  }
}

if(gameState == "end"){
  background(0);
  
  fill("yellow")
  textSize(25)
  text("Game Over", 220,300);
  
  

}
  
  
  


}
function spawnDoors(){
  if(frameCount%240 == 0){
    door = createSprite(150,100,100,100);
    door.addImage("door", doorImg);
    door.x = Math.round(random(120,560));
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    

    climber = createSprite(door.x,170,100,22);
    climber.addImage("climber", climberImg);
    climber.velocityY = door.velocityY;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x,climber.y + 10,20,15);
    invisibleBlock.velocityY = climber.velocityY;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}
