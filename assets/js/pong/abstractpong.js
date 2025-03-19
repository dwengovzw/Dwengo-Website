// The pong game is represented by a grid world with 16 rows and 32 columns.
// The game is played by two players, each controlling a paddle. 
// One paddle is controlled by the computer and always moves towards the ball.
// The other paddle is controlled by the agent that learns to play the game using q-learning.

// The pong object represents the game state, the grid starts in the top-left corner.
let pong = {
    world: {
        rows: 16,
        cols: 16,
    },
    ball: { row: 0, col: 0, x_dir: 0, y_dir: 0, speed: 0.5, cancollide: true },
    computerPaddle: { row: 0, col: 0, length: 3 },
    rlPaddle: { row: 0, col: 0, length: 3 },
    score: 0,
    gameOver: false, 
    currentReward: null,
    rewardVisible: 50,
    collisionTime: 0,
    showGameFromScore: 450
}

// Reset the game state
function reset() {
    // Reset the ball at a random position around the center of the grid
    pong.ball.row = Math.floor(pong.world.rows / 2) + Math.floor(Math.random() * 7) - 3;
    pong.ball.col = Math.floor(pong.world.cols / 2) + Math.floor(Math.random() * 3) - 1;
    pong.ball.x_dir = Math.random() < 0.5 ? 1 : -1;
    pong.ball.y_dir = Math.random() < 0.5 ? 1 : -1;
    pong.ball.speed = 0.5;
    pong.computerPaddle.row = Math.floor(pong.world.rows / 2);
    pong.computerPaddle.col = pong.world.cols - 1;
    pong.rlPaddle.row = Math.floor(pong.world.rows / 2);
    pong.rlPaddle.col = 0;
    pong.score = 0;
    pong.gameOver = false;
}

// Move the computer paddle
function moveComputerPaddle() {
    if (pong.ball.row < pong.computerPaddle.row + Math.floor(pong.computerPaddle.length / 2)) {
        pong.computerPaddle.row--;
    } else if (pong.ball.row > pong.computerPaddle.row + pong.computerPaddle.length - 1 - Math.floor(pong.computerPaddle.length / 2)) {
        pong.computerPaddle.row++;
    }
}

function moveComputerPaddleUp() {
    if (pong.computerPaddle.row > 0) {
        pong.computerPaddle.row--;
    }
}

function moveComputerPaddleDown() {
    if (pong.computerPaddle.row < pong.world.rows - pong.computerPaddle.length) {
        pong.computerPaddle.row++;
    }
}


// Move the rl paddle using arrow keys
function moveRLPaddleUp() {
    if (pong.rlPaddle.row > 0) {
        pong.rlPaddle.row--;
    }
}

function moveRLPaddleDown() {
    if (pong.rlPaddle.row < pong.world.rows - pong.rlPaddle.length) {
        pong.rlPaddle.row++;
    }
}

// Move the ball
function moveBall() {
    pong.ball.row += pong.ball.y_dir * pong.ball.speed;
    pong.ball.col += pong.ball.x_dir * pong.ball.speed;
    // Bounce from top and bottom
    if (pong.ball.row <= 0 || pong.ball.row >= pong.world.rows - 1) {
        pong.ball.y_dir *= -1;
    }
    // Check if rl player has lost
    if (pong.ball.col == 0) {
        pong.score -= 10;
        pong.ball.x_dir *= -1;
        pong.currentReward = -10;
        pong.rewardVisible = 10;
        pong.ball.cancollide = false;
        pong.collisionTime = 10;
    }
    // Check for collision with rl paddle
    if (pong.ball.col <= pong.rlPaddle.col + 1 && pong.ball.row >= pong.rlPaddle.row && pong.ball.row < pong.rlPaddle.row + pong.rlPaddle.length && pong.ball.cancollide) {
        // Change y direction depending on where the ball has hit the paddle
        if (pong.ball.row == pong.rlPaddle.row && pong.ball.row > 1){
            pong.ball.y_dir = -1;
        } else if (pong.ball.row == pong.rlPaddle.row + pong.rlPaddle.length - 1 && pong.ball.row < pong.world.rows - 2){
            pong.ball.y_dir = 1;
        }
        pong.ball.x_dir *= -1;
        pong.score+=100;
        pong.currentReward = 100;
        pong.rewardVisible = 10;
    }

    // Check if computer player has lost
    if (pong.ball.col == pong.world.cols - 1) {
        pong.score -= 100;
        pong.x_dir *= -1;
        pong.currentReward = -100;
        pong.rewardVisible = 10;
    }
    // Check for collision with computer paddle
    if (pong.ball.col == pong.computerPaddle.col - 1 && pong.ball.row >= pong.computerPaddle.row && pong.ball.row < pong.computerPaddle.row + pong.computerPaddle.length) {
        // Change y direction depending on where the ball has hit the paddle
        if (pong.ball.row == pong.computerPaddle.row && pong.ball.row > 1){
            pong.ball.y_dir = -1;
        } else if (pong.ball.row == pong.computerPaddle.row + pong.computerPaddle.length - 1 && pong.ball.row < pong.world.rows - 2){
            pong.ball.y_dir = 1;
        } 
        pong.ball.x_dir *= -1;
    }
}

// Get the canvas
let canvas = document.getElementById('pong');
let ctx = canvas.getContext('2d');


// Draw the game on the canvas with id pong
function draw() {
    // Draw a grid on the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    let row_end = canvas.width/pong.world.cols;
    if (pong.score > pong.showGameFromScore) {
        row_end = canvas.width;
    }
    for (let i = 0; i <= pong.world.rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * canvas.height / pong.world.rows);
        ctx.lineTo(row_end, i * canvas.height / pong.world.rows);
        ctx.stroke();
    }

    let cols = 1;
    if (pong.score > pong.showGameFromScore) {
        cols = pong.world.cols;
    }
    for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * canvas.width / pong.world.cols, 0);
        ctx.lineTo(i * canvas.width / pong.world.cols, canvas.height);
        ctx.stroke();
    }

    // Draw the ball
    if (pong.score > pong.showGameFromScore) {
        ctx.fillStyle = 'white';
        ctx.fillRect(pong.ball.col * canvas.width / pong.world.cols, pong.ball.row * canvas.height / pong.world.rows, canvas.width / pong.world.cols, canvas.height / pong.world.rows);
    }

    // Draw the y-position in text on the canvas
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('' + Math.floor(pong.ball.row), canvas.width/4, canvas.height/2);


    // Draw the computer paddle
    if (pong.score > pong.showGameFromScore) {
        ctx.fillStyle = 'white';
        ctx.fillRect(pong.computerPaddle.col * canvas.width / pong.world.cols, pong.computerPaddle.row * canvas.height / pong.world.rows, canvas.width / pong.world.cols, pong.computerPaddle.length * canvas.height / pong.world.rows);
    }

    // Draw the rl paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(pong.rlPaddle.col * canvas.width / pong.world.cols, pong.rlPaddle.row * canvas.height / pong.world.rows, canvas.width / pong.world.cols, pong.rlPaddle.length * canvas.height / pong.world.rows);

    // Draw the y-position in text on the canvas
    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.fillText('' + Math.floor(pong.rlPaddle.row), canvas.width/pong.world.cols + 20, (pong.rlPaddle.row + 2) * canvas.height / pong.world.rows + 3);
    // Draw an up arrow above and a down arrow below the y-position on the canvas 
    ctx.font = '25px Arial';
    ctx.fillText('↑', canvas.width/pong.world.cols + 20, (pong.rlPaddle.row + 1) * canvas.height / pong.world.rows);
    ctx.fillText('↓', canvas.width/pong.world.cols + 20, (pong.rlPaddle.row + 3) * canvas.height / pong.world.rows);


    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + pong.score, canvas.width/4 - 60, 30);

    // Draw the game over message
    if (pong.gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over', 100, 300);
    }

    // Draw the reward
    if (pong.currentReward != null) {
        if (pong.currentReward > 0) {
            ctx.fillStyle = 'green';
        } else {
            ctx.fillStyle = 'red';
        }
        ctx.font = 30 + (10 - pong.rewardVisible) + 'px Arial';
        ctx.fillText((pong.currentReward > 0 ? "+" : "") + pong.currentReward, canvas.width/2 + pong.rewardVisible, 60 + pong.rewardVisible);
    }

}

// Read user input
keys = {
    ArrowUp: false,
    ArrowDown: false
};
document.addEventListener('keydown', function (event) {
    if (event.code in keys) {
        keys[event.code] = true;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.code in keys) {
        //keys[event.code] = false;
    }
});

// Reset the game state
reset();

// Reset the game state on spacebar
document.addEventListener('keydown', function (event) {
    if (event.code == 'Space') {
        reset();
    }
});

//The game loop
function game(){
    if (pong.collisionTime > 0) {
        pong.collisionTime--;
    } else {
        pong.ball.cancollide = true;
    }
    if (!pong.gameOver) {
        // Read user input
        if (keys.ArrowUp) {
            console.log("up");
            moveRLPaddleUp();
        }
        if (keys.ArrowDown) {
            console.log("down")
            moveRLPaddleDown();
        }
        // Reset the keys
        keys.ArrowUp = false;
        keys.ArrowDown = false; 
        moveBall();
        moveComputerPaddle();
        if (pong.rewardVisible > 0) {
            pong.rewardVisible--;
        } else {
            pong.currentReward = null;
        }
    }
    draw();
} 


let interval = null;

document.getElementById('start').addEventListener('click', function () {
    if (interval != null){
        clearInterval(interval);
        reset();
        draw();
    }
    interval = setInterval(function () {
        game();
    }, 1000 / 5);
});

document.getElementById('reset').addEventListener('click', function () {
    clearInterval(interval);
    reset();
    draw();
});

// Show up and down arrows when on mobile device and control the game with those
document.getElementById('up').addEventListener('click', function () {
    moveRLPaddleUp();
    draw();
});

document.getElementById('down').addEventListener('click', function () {
    moveRLPaddleDown();
    draw();
});

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

function resizeCanvas() {
    const canvas = document.getElementById("pong");
    const aspectRatio = 1; // Adjust as needed
    let width, height;
    if (window.innerWidth < window.innerHeight) {
        width = Math.min(window.innerWidth, 400);
        height = width / aspectRatio;
    } else {
        height = Math.min(window.innerHeight, 400);
        width = height * aspectRatio;
    }
    
    const isMobile = window.mobileCheck(); //resolves true/false

    console.log(window.innerWidth);

    if (isMobile) {

        if (height > 400) {
            height = 400;
            width = height * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width*window.devicePixelRatio + "px";
        canvas.style.height = height*window.devicePixelRatio + "px";
    } else {
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.width = "400px";
        canvas.style.height = "400px";
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


