song = "";
leftwristx=0;
leftwristy=0;

rightwristx=0;
rightwristy=0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600, 400);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);
}

function modelLoaded(){
console.log("model is initiated");
}

function gotposes(result){
if(result.length>0){
console.log(result)
leftwristx = result[0].pose.leftWrist.x;
leftwristy = result[0].pose.leftWrist.y;

scoreLeft = result[0].pose.keypoints[9].score;
scoreRight = result[0].pose.keypoints[10].score;


rightwristx = result[0].pose.rightWrist.x;
rightwristy = result[0].pose.rightWrist.y;
}
}

function draw(){
image(video,0,0,600,400);
fill("#800080");
stroke("#000000");

if(scoreLeft > 0.2){
circle(leftwristx, leftwristy, 20);

leftnum = Number(leftwristy);

rdl = floor(leftnum);
volume = rdl/500;
document.getElementById("volume").innerHTML = "volume="+volume;
song.setVolume(volume);

}
if(scoreRight > 0.2){
circle(rightwristx, rightwristy, 20);
if(rightwristy > 0 && rightwristy <= 100){
document.getElementById("speed").innerHTML= "speed = 0.5x";
song.rate(0.5);
}

else if(rightwristy > 100 && rightwristy <= 200){
    document.getElementById("speed").innerHTML= "speed = 1x";
    song.rate(1);
    }

else if(rightwristy > 200 && rightwristy <= 300){
document.getElementById("speed").innerHTML= "speed = 1.5x";
song.rate(1.5);
}

else if(rightwristy > 300 && rightwristy <= 400){
document.getElementById("speed").innerHTML= "speed = 2x";
song.rate(2);
}

 else if(rightwristy > 400 && rightwristy <= 500){
 document.getElementById("speed").innerHTML= "speed = 2.5x";
 song.rate(2.5);
 
}
}
}

function play(){
song.play();
song.rate(1);
song.setVolume(1);
}


