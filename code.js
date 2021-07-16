var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["39c3fcc6-83c8-47b9-b14b-03a6d89e93ab","0d6642a0-d5f7-4ef4-8751-0cbf9e58134f","e5555964-de36-44b8-ac91-9289d23c8d88"],"propsByKey":{"39c3fcc6-83c8-47b9-b14b-03a6d89e93ab":{"name":"basketball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf/category_sports/basketball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf/category_sports/basketball.png"},"0d6642a0-d5f7-4ef4-8751-0cbf9e58134f":{"name":"sports_basketballhalf2_1","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"2.BiEOWQyTRHSinHXMjld6IMH0pZyJsq","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/0d6642a0-d5f7-4ef4-8751-0cbf9e58134f.png"},"e5555964-de36-44b8-ac91-9289d23c8d88":{"name":"hand_ball","sourceUrl":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating the play arena..
var playground = createSprite(200,200);
playground.setAnimation("sports_basketballhalf2_1");
playSound( "assets/category_background/fantasy.mp3");
var top_wall1 = createSprite(75,5,150,10);
top_wall1.shapeColor = "red";

var top_wall2 = createSprite(325,5,150,10);
top_wall2.shapeColor = "red";

var ball = createSprite(200, 370);
ball.setAnimation("hand_ball");
ball.scale = 0.08;


//create player paddle at bottom of screen of width 100 and height 10
var paddle = createSprite(200, 392, 165, 10);
paddle.shapeColor = color(0,0,255);

//define gameState variable and set it to 'serve'
var gameState = "serve";

//create edges.
createEdgeSprites();

function draw() {
  background("white");
  
  drawSprites();
  textSize(20);
 
 //check if gameState is 'serve' and display text for serve.
  if (gameState == "serve") {
    text("Mouse Click to Serve",110,180);
  }
  
  //check if state is 'over' and display 'Game Over' text
if (gameState == "over") {
    text("Game Over",140,180);
  }

//bounce ball from top wall
  ball.bounceOff(top_wall1);
  ball.bounceOff(top_wall2);
  
  //bounce the ball from left and right edges.
  ball.bounceOff(rightEdge);
  ball.bounceOff(leftEdge);
  
  //bounce the ball from player_paddle.
  ball.bounceOff(paddle)
  
  //move player paddle as per mouse's x-position

paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  
  
  //check if ball is touching top edge.
  if(ball.isTouching(topEdge)) {
    gameState="over";
    //call 'reset' function to reset the ball
    reset();
    //change gameState to 'serve'
    //gameState = "serve";
  }
  
  //write if condition to check if ball is touching bottom edge. 
  //change gameState to 'over' inside 'if condition'
     if ( ball.isTouching(bottomEdge)){
     gameState="over";
  }
}
function mousePressed(){
  if(gameState=="serve"){
 ball.velocityX = 2;
  ball.velocityY = -3;
  
  //change gameState to 'play'
  gameState = "play";}
}

function reset() {
  //stop the ball
  ball.velocityX = 0;
  ball.velocityY = 0;

  //reset the ball to the starting position
  ball.x = 200;
  ball.y = 370;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
