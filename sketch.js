const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  console.log (isMobile)
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(3);



  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

 mute_btn= createImg('mute.png');
 mute_btn.position(420,30);
 mute_btn.size(50,50);
 mute_btn.mouseClicked(mute);

  button1= createImg('cut_btn.png');
  button1.position(70,30);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2= createImg('cut_btn.png');
  button2.position(360,70);
  button2.size(50,50);
  button2.mouseClicked(drop2);


   
 blower = createImg('balloon.png');
 blower.position(100,265);
  blower.size(101,101);
  blower.mouseClicked(airblow);


  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,windowWidth+200,10);

  rope1= new Rope(10,{x:90,y:30});
  
  rope2= new Rope(5,{x:380,y:70});


  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1= new Link(rope1,fruit);
  fruit_con2= new Link(rope2,fruit);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,windowWidth,windowHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();
  rope1.show();
  rope2.show();
  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  eating_sound.setVolume(3);

  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
bk_song.stop()
    sad_sound.play();
    sad_sound.setVolume(3);
  
     
   }
   
}
function keyPressed(){
  if (keyCode==LEFT_ARROW){
   bunny.x=bunny.x-5
  }
  if (keyCode==RIGHT_ARROW){
    bunny.x=bunny.x+5
   }


}
function drop()
{bk_song.stop()
cut_sound.play();
  cut_sound.setVolume(3);
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop1()
{bk_song.stop()
cut_sound.play();
  cut_sound.setVolume(3);
  rope1.break();
  fruit_con1.detach();
  fruit_con1= null;
}

function drop2()
{bk_song.stop()
cut_sound.play();
  cut_sound.setVolume(3);
  rope2.break();
  fruit_con2.detach();
  fruit_con2= null; 
}

function airblow(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
bk_song.stop()
air.play()



}
function mute(){
  if (bk_song.isPlaying()){
bk_song.stop()
  }
  else{
bk_song.play()
  }
}




function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


