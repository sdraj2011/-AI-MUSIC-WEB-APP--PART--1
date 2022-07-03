
var song1="";
var song2="";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function modelloaded() {
    console.log("posenet is initialized");

}

function draw() {
  var song1status=song1.isPlaying();
  var song2status=song2.isPlaying();
    image(video, 0, 0, 600, 500);
    fill(0, 255, 0);
    stroke(0, 255, 0);
    song1_variable.stop;
    song2_variable.stop;
    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy, 20);
        inNumberleftwristy = Number(leftwristy);
        removeDecimals = floor(inNumberleftwristy);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "VOLUME:" + volume;
        song.setVolume(volume);
    }
    if (scorerightwrist > 0.2) {
        circle(rightwristx, rightwristy, 20);
        if (rightwristy > 0 && rightwristy <= 100) {
            document.getElementById("speed").innerHTML = "speed:0.5x";
            song.rate(0.5);
        } else if (rightwristy > 100 && rightwristy <= 200) {
            document.getElementById("speed").innerHTML = "speed:1x";
            song.rate(1);
        } else if (rightwristy > 200 && rightwristy <= 300) {
            document.getElementById("speed").innerHTML = "speed:1.5x";
            song.rate(1.5);
        } else if (rightwristy > 300 && rightwristy <= 400) {
            document.getElementById("speed").innerHTML = "speed:2x";
            song.rate(2);
        } else if (rightwristy > 400 && rightwristy <= 500) {
            document.getElementById("speed").innerHTML = "speed:2.5x";
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist-" + scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist-" + scorerightwrist);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.leftWrist.x;
        rightwristy = results[0].pose.leftWrist.y;

    }
}
