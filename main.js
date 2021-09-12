song1 = ""
song2 = ""

leftwrist_X = 0
rightwrist_Y = 0
leftwrist_Y = 0
rightwrist_X = 0

score_leftwrist = 0
score_rightwrist = 0

song1_status = ""
song2_status = ""


function preload(){

    song1 =loadSound( "music.mp3")
    song2 =loadSound( "music2.mp3")


}

function setup(){

    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    classifier = ml5.poseNet(video,modelLoaded)
    classifier.on("pose" , gotposes)
}


function draw(){

image( video, 0, 0, 600, 500)

song1_status = song1.isPlaying()
song2_status = song2.isPlaying()
fill("black")
stroke("red")

if (score_leftwrist>0.2){

    circle(leftwrist_X, leftwrist_Y , 20)

    song1.stop()

    if (song2_status  ==  false){

        song2.play()
        document.getElementById("song_name").innerHTML = 'playing peter pan song' 

    }


}












if (score_rightwrist>0.2){

    circle(rightwrist_X, rightwrist_Y , 20)

    song2.stop()

    if (song1_status  ==  false){

        song1.play()
        document.getElementById("song_name").innerHTML = 'playing harry potter song' 

    }


}



}

function modelLoaded(){

    console.log("model is loaded")

}

function gotposes(results){

    if (results.length>0)
{
    console.log(results)}


    leftwrist_X = results[0].pose.leftWrist.x
    leftwrist_Y = results[0].pose.leftWrist.y

   rightwrist_X = results[0].pose.rightWrist.x
   rightwrist_X = results[0].pose.rightWrist.y

   score_leftwrist =results[0].pose.keypoints[9].score
   score_rightwrist = results[0].pose.keypoints[10].score
}
