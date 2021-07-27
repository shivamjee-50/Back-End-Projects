var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var ball = document.getElementById("ball");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

let movement;
let ballspeedx = 2;
let ballspeedy = 2;
let score1 = 0;
let score2 = 0;
let highScore = localStorage.getItem("HighScore");
let gameOn = false;

//Store and update Score Function
function storeWin(score,rod){
    clearInterval(movement);

    if(score > highScore){
        localStorage.setItem("HighScore", score);
    }
    window.alert(rod +" wins: Score = " + score + " HighScore = "+ localStorage.getItem("HighScore"));
    resetBoard();
}


//Reset Board Function
function resetBoard(){
    ball.style.left = "50%";
    rod1.style.left = "44%";
    rod2.style.left = "44%";
    score1 = 0;
    score2 = 0;
    ballspeedx = 2;
    gameOn = false;
}

window.addEventListener("keypress", function(event){
    
    //Setting the motion of Rods
    let rod1pos = rod1.getBoundingClientRect();
    let rod1x = rod1pos.x;
    let rod1width = rod1pos.width;
    
    if(event.code == "KeyD" && (rod1x+rod1width < windowWidth)){
        rod1.style.left = rod1x + 20 + 'px';
        rod2.style.left = rod1.style.left;
    } else if(event.code === "KeyA" && rod1x > 0){
        rod1.style.left = rod1x - 20 + 'px';
        rod2.style.left = rod1.style.left;
    }
    
    //Game Start
    if(event.code === "Enter"){
        
        if(!gameOn){
            gameOn = true;
            //Setting the Motion of Ball
            function ballmotion() {
                
                let ballpos = ball.getBoundingClientRect();

                let ballx = ballpos.x;
                let bally = ballpos.y;
                let balldia = ballpos.width;
                let ballcen = ballx+(balldia)/2;
                
                let rod1Height = rod1pos.height;
                let rod1Width = rod1pos.width;
                
                ballx += ballspeedx;
                bally += ballspeedy;
                
                ball.style.left = ballx + "px";
                ball.style.top = bally + "px";
                
                let rod1x = rod1.getBoundingClientRect().x;
                
                // Reverse Direction
                if((ballx+balldia > windowWidth) || ballx < 0){
                    ballspeedx = -ballspeedx;
                }
                
                //Check for Rod1
                if(bally < rod1Height){
                    ballspeedy = -ballspeedy;
                    score1++;

                    //Check if Game ends
                    if((ballcen<rod1x) || (ballcen>(rod1x+rod1Width))){
                        storeWin(score2,"rod2");
                    }
                }
                
                //Check for Rod2
                else if(bally+balldia > windowHeight-rod1Height){
                    ballspeedy = -ballspeedy;
                    score2++;
                    
                    //Check if Game ends
                    if((ballcen<rod1x) || (ballcen>(rod1x+rod1Width))){
                        clearInterval(movement);
                        storeWin(score1,"rod1");
                    }
                }
            }
        }
        movement = setInterval( ballmotion, 10);
    }
})