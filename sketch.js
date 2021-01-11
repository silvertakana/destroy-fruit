//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;
let it = "go";
var knife, knifeImage;
var fruit, FG, F2, F3, F4, F5, F6, F7;
var bomb, bImg, BG;
var ran, hit, died, music, overSong, over, OIMG;

function preload() {
  OIMG = loadImage("pixil-frame-0 (2).png");
  knifeImage = loadImage("knife.png");
  F2 = loadImage("pixil-frame-2.png");
  F3 = loadImage("pixil-frame-3.png");
  F4 = loadImage("pixil-frame-4.png");
  F5 = loadImage("pixil-frame-5.png");
  F6 = loadImage("pixil-frame-6.png");
  F7 = loadImage("pixil-frame-7.png");
  bImg = loadImage("bomb.png");
  died = loadSound("Hit_Hurt10.wav");
  hit = loadSound("Pickup_Coin25.wav");
  music = loadSound("themeSong.mp3");
  overSong = loadSound("gameOverMusic.mp3")
}



function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 1, 1);
  knife.addImage(knifeImage);
  knife.scale = 0.7

  over = createSprite(300, 300, 2, 2);
  over.addImage(OIMG);
  over.scale = 3
  over.setCollider("rectangle", 0, 0, 45, 30);
  over.debug = 0;

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 100, 100);

  score = 0;
  //create fruit and monster Group variable here
  BG = new Group();
  FG = new Group();
  music.loop();
}

function draw() {
  background(50, 50, 50);
  drawSprites();

  if (gameState === PLAY) {
    over.visible = 0
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    if (frameCount % round(50 / (score / 5 + 1)) === 0) {
      spawn();
    }
    if (FG.isTouching(knife)) {
      FG.destroyEach()
      hit.play();
      score = score + 1;
    }
    BG.setVelocityYEach(5 * (score / 5 + 1));
    FG.setVelocityYEach(5 * (score / 5 + 1));
    if (BG.isTouching(knife)) {
      died.play();
      music.stop();
      overSong.play();
      gameState = END;
    }
  } else {
    BG.setVelocityYEach(0);
    FG.setVelocityYEach(0);
    BG.setLifetimeEach(-1);
    FG.setLifetimeEach(-1);
    over.y = 300 + (20 * cos((frameCount - 3) * 20));
    over.rotation = 0 + (20 * cos((frameCount - 3) * 10));
    over.visible = 1
    if (mouseIsOver(over)) {
      over.scale = over.scale + (3 - over.scale) / 3;
      if (mouseDown("leftButton")) {
        gameState = PLAY;
        overSong.pause();
        music.play();
        BG.destroyEach();
        FG.destroyEach();
        score = 0;
      }
    } else {
      over.scale = over.scale + (2 - over.scale) / 3;
    }
  }



  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function spawn() {

  ran = round(random(2, 8));
  if (ran === 8) {
    bomb = createSprite(random(100, 500), 0, 20, 20);
    bomb.scale = 2;
    bomb.lifetime = 120
  } else {
    fruit = createSprite(random(100, 500), 0, 10, 10);
    fruit.scale = 1;
    fruit.lifetime = 120
  }
  switch (ran) {
    case 2:
      fruit.addImage(F2);
      break;
    case 3:
      fruit.addImage(F3);
      break;
    case 4:
      fruit.addImage(F4);
      break;
    case 5:
      fruit.addImage(F5);
      break;
    case 6:
      fruit.addImage(F6);
      break;
    case 7:
      fruit.addImage(F7);
      break;
    case 8:
      bomb.addImage(bImg);
      break;
  }
  if (ran === 8) {
    BG.add(bomb);
    bomb.setCollider("circle", 0, 0, 20);
    over.depth = bomb.depth + 1;
  } else {
    FG.add(fruit);
    fruit.setCollider("circle", 0, 0, 20);
    over.depth = fruit.depth + 1;
  }

}