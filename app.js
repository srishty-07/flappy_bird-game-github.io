var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// var playerName=prompt("Player Name:","");
// if(playerName!=null){
//     document.getElementById("welcome").innerHTML =
//      playerName;
// }

// to load images

// variables for images

// var imageName=new Image();
// imageName.src="img/";
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pn = new Image();
var ps = new Image();
// sources
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pn.src = "img/pipeNorth.png";
ps.src = "img/pipeSouth.png";

// function to draw images

// variables
var gap = 85;
var constant = pn.height + gap;
var bX = 10; //bird's x position
var bY = 150; //bird's y position
var gravity = 1.5;
var score=0;

// audio

// var audioName=new Audio();
// audioName.src="img/";
var fly=new Audio();
var scor=new Audio();

fly.src="img/fly.mp3";
scor.src="img/score.wav";



// keyboard events

// on key down
document.addEventListener("keydown", moveUp);
function moveUp() {
  bY -= 25;
  fly.play();
}

// for random pipe creation
var pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

function draw() {
  // context.drawImage(imageName,X,Y,Width,Height);

  // background pos
  context.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    context.drawImage(pn, pipe[i].x, pipe[i].y);
    context.drawImage(ps, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    // if pipe finishes then
    // creating new pipe
    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pn.height) - pn.height,
      });
    }

    // when bird collide with pipe
    if (
      bX + bird.width >= pipe[i].x &&
      bX <= pipe[i].x + pn.width &&
      (bY <= pipe[i].y + pn.height || bY + bird.height >= pipe[i].y + constant)
      ||bY+bird.height>=canvas.height-fg.height
    ) {
        location.reload();
    }

    if(pipe[i].x==5){
        score++;
        scor.play();
    }
    


  }

  

  // foreground position
  // x=0,y=canvas height -foreground height
  context.drawImage(fg, 0, canvas.height - fg.height);

  // bird
  context.drawImage(bird, bX, bY);
  bY += gravity;
  


  //to display score on canvas 
  context.fillStyle="#000";
  context.font="20px arial";
  context.fillText("Score : "+score,10,canvas.height-30);  

  requestAnimationFrame(draw);
}
draw();
