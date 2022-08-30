var oito, oitoImg;
var obst1, obst1Img,obst2, obst2Img, obst3,obst3Img, obst4, obst4Img;
var gameover, gameoverImg;
var recomecar, recomecarImg
var fundo,fundoImg;
var PLAY=0
var END=1
var gameState=PLAY
var score=0


function preload()
{
  oitoImg=loadAnimation("anos80.png","anos-90.png");
  obst1Img=loadImage("controle-de-video-game.png");
  obst2Img=loadImage("dinossauro.png");
  obst3Img=loadImage("lampada-de-lava.png");
  obst4Img=loadImage("maquina-de-arcade.png");
  gameoverImg=loadImage("game-over.png");
  recomecarImg=loadImage("recarregar.png");
  fundoImg=loadImage("fundo.jpg");
}

function setup() 
{
  createCanvas(600,400);

  fundo=createSprite(300,200,150,200);
  fundo.addImage("fundo",fundoImg);
  fundo.velocityY=3;
  fundo.scale=1.0;

  oito=createSprite(300,350,50,50);
  oito.addAnimation("oito",oitoImg);
  oito.scale=0.2;

  gameover=createSprite(300,300,50,50);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale=0.5
  gameover.visible=false;

  recomecar=createSprite(300,100,50,50);
  recomecar.addImage("recomecar",recomecarImg);
  recomecar.scale=0.2
  recomecar.visible=false;

  obst1Group = new Group();
  obst2Group = new Group();
  obst3Group = new Group();
  obst4Group = new Group();

}


function draw() 
{
  background("black");

  if (gameState===PLAY)
    {
      recomecar.visible=false;
      gameover.visible=false;

      spawnobst1();
      spawnobst2();
      spawnobst3();
      spawnobst4();

      fundo.velocityY=3;

      if (fundo.y>400)
      {
       fundo.y= fundo.height/6;
      }
     
      if (obst1Group.isTouching(oito)) {
        obst1Group.destroyEach();
        score=score+5;
      }
      if (obst3Group.isTouching(oito)) {
        obst2Group.destroyEach();
        score=score+10;
      }
      if (obst4Group.isTouching(oito)) {
        obst4Group.destroyEach();
        score=score+5;
      }
      if (oito.isTouching(obst2Group))
      {
       gameState=END;
      }
    }

  else if (gameState===END)
  {
     gameover.visible=true;
     recomecar.visible=true;
     fundo.velocityY = 0;
     oito.velocityX = 0;
     
     obst1Group.setVelocityYEach(0);
     obst2Group.setVelocityYEach(0);
     obst3Group.setVelocityYEach(0);
     obst4Group.setVelocityYEach(0);

     obst1Group.destroyEach();
     obst2Group.destroyEach();
     obst3Group.destroyEach();
     obst4Group.destroyEach();

     obst1Group.setLifetimeEach(0);
     obst2Group.setLifetimeEach(0);
     obst3Group.setLifetimeEach(0);
     obst4Group.setLifetimeEach(0);

     if (mousePressedOver(recomecar)){
        reset();
     }
  }

  
  if(keyDown("LEFT_ARROW"))
  {
    oito.x = oito.x - 3;
  }

  if(keyDown("RIGHT_ARROW"))
  {
   oito.x = oito.x + 3;
  }

 drawSprites();

 stroke("black");
 fill("black");
 textSize(20);
 text("Score: "+ score,50,30);

}

function spawnobst1()
{
  if (frameCount % 200 === 0)
   {
     var obst1 = createSprite(Math.round(random(5,400)),-10);
     obst1.addImage(obst1Img);
     obst1.velocityY = 3;
     obst1.lifetime = 800;
     obst1.scale=0.2
     obst1Group.add(obst1);
   }
}

function spawnobst2()
{
  if (frameCount % 220 === 0)
   {
     var obst2 = createSprite(Math.round(random(5,400)),-10);
     obst2.addImage(obst2Img);
     obst2.velocityY = 3;
     obst2.lifetime = 800;
     obst2.scale=0.2
     obst2Group.add(obst2);
   }
}

function spawnobst3()
{
  if (frameCount % 320 === 0)
   {
     var obst3 = createSprite(Math.round(random(5,400)),-10);
     obst3.addImage(obst3Img);
     obst3.velocityY = 3;
     obst3.lifetime = 800;
     obst3.scale=0.2
     obst3Group.add(obst3);
   }
}

function spawnobst4()
{
  if (frameCount % 410 === 0)
   {
     var obst4 = createSprite(Math.round(random(5,600)),-10);
     obst4.addImage(obst4Img);
     obst4.velocityY=3;
     obst4.lifetime = 150;
     obst4.scale=0.2;
     obst4Group.add(obst4);
   }
}

function reset()
{
  gameState=PLAY;
  score=0;
}