var monkey,monkey_running; 
var banana, banana_image, bananaGrp;
var obstacle, obstacle_image, obstacleGrp
var backgroundJ,backgroundJ_image;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;
var restart, restart_img;
var gameOver, gameOver_img;

function preload()
{
  backgroundJ_image = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png",
"Monkey_03.png","Monkey_04.png","Monkey_05.png",
"Monkey_06.png","Monkey_07.png","Monkey_08.png",
"Monkey_09.png","Monkey_10.png");
  
banana_image = loadImage("Banana.png");
obstacle_image = loadImage("stone.png");

restart_img = loadImage("restart.png");
gameOver_img = loadImage("gameOver.png");
}

function setup() 
{
  createCanvas(600,300);
  
  backgroundJ = createSprite(300,0,1200,20);
  backgroundJ.addImage("backImage",backgroundJ_image);
  backgroundJ.x = backgroundJ.width /2;
  backgroundJ.velocityX = -6
  backgroundJ.scale = 1.2
  
  monkey = createSprite(50,250,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,280,600,5)
  ground.visible = false;
  
  restart = createSprite(300,200,20,20);
  restart.addImage("restart",restart_img);
  restart.visible = false;
  
  gameOver = createSprite(300,130,20,20);
  gameOver.addImage("lose",gameOver_img);
  gameOver.visible = false;
  
  bananaGrp = createGroup();
  obstacleGrp = createGroup();
}


function draw()
{
 background(255); 
 if(gameState === PLAY)
  {
    backgroundJ.velocityX = -6;
    
    if(keyDown("space") && monkey.y>=120)
    {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
     
    if(backgroundJ.x<0)
    {
       backgroundJ.x = backgroundJ.width/2;
    }
    
    monkey.collide(ground);
     
    Stone();
    food();
     
    if(bananaGrp.isTouching(monkey))
    {
       bananaGrp.destroyEach();
       count = count + 2
    }
     
    switch(count)
    {
      case 20:monkey.scale = 0.12;
        break;
      case 30:monkey.scale = 0.14;
        break;
      case 40:monkey.scale = 0.16;
        break;
      case 50:monkey.scale = 0.18;
        break
      default:break;
        
    }
     
    if(obstacleGrp.isTouching(monkey) && count>=30)
    {
     Reset();   
      monkey.scale = 0.11;
    }
       
    else if(obstacleGrp.isTouching(monkey))
    {
      gameState = END;
    }
  }
  
  else if(gameState === END)
  {
    restart.visible = true;
    gameOver.visible = true;
    
    backgroundJ.velocityX = 0;
    monkey.velocityY = 0;
    banana.velocityX = 0;
    obstacle.velocityX = (0);
    
    obstacleGrp.setLifetimeEach(-1);
    bananaGrp.setLifetimeEach(-1);
    
     if(mousePressedOver(restart))
    {
      Reset();
      
    }
    
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white")
  text("Score:"+count,500,50); 
}

function Stone()
{
  if(World.frameCount % 120 === 0)
  {
    obstacle = createSprite(600,250,10,10);
    obstacle.addImage("Stone", obstacle_image);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 150;
    obstacleGrp.add(obstacle);
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth+1
  }
  
}

function food()
{
  if(World.frameCount % 80 === 0)
  {
    banana = createSprite(200,120,10,10);
    banana.y = random(120,200)
    banana.addImage("food",banana_image);
    banana.scale = 0.05;
    banana.velocityX = -6
    banana.lifetime = 100;
    bananaGrp.add(banana); 
  }
}

function Reset()
{
 gameState = PLAY;
 
 restart.visible = false;
 gameOver.visible = false;
 
 bananaGrp.destroyEach();
 obstacleGrp.destroyEach();
 
 count = 0;
 
 
}
  