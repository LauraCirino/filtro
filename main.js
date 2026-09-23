let noseX = 0;
let noseY = 0;
let cap;
let canvas;
let video;
let poseNet;

function preload(){
    cap = loadImage("filtro.png");
}

function setup(){
    canvas = createCanvas(800, 600);
    canvas.parent("canvas-container");

    video = createCapture(VIDEO);
    video.size(800, 600);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = " + results[0].pose.nose.x);
        console.log("nose y = " + results[0].pose.nose.y);
    }
}

function draw(){
    background(0);
    image(video, 0, 0, width, height);
    image(cap, noseX -200, noseY -350, 400, 400);
}

function takeSnapshot(){
    save("filterImage.png");
}