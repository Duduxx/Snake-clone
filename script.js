const snakeHead = document.getElementById('snakeHead');
const apple = document.getElementById('apple');
const playArea = document.getElementById('playArea');

let snakeBody = [];

//X-axis
let xAxisDir = 2;
let xAxisPos = 0;
let prevXAxisPos = 0;

//Y-axis
let yAxisDir = 0;
let yAxisPos = 0;
let prevYAxisPos = 0;


addEventListener("keydown", changeDirection);
addEventListener("load", () => setInterval(moveSnake, 250));
addEventListener("load", spawnApple);

function changeDirection(event){    
    switch(event.code){
        case 'ArrowUp':
            if(xAxisDir == 0 && yAxisDir == 2)
                break;
            xAxisDir = 0;
            yAxisDir = -2;
            break;
        case 'ArrowRight':
            if(xAxisDir == -2 && yAxisDir == 0)
                break;
            xAxisDir = 2;
            yAxisDir = 0;
            break;
        case 'ArrowDown':
            if(xAxisDir == 0 && yAxisDir == -2)
                break;
            xAxisDir = 0;
            yAxisDir = 2;
            break;
        case 'ArrowLeft':
            if(xAxisDir == 2 && yAxisDir == 0)
                break;
            xAxisDir = -2;
            yAxisDir = 0;
            break;
        default:
            break;
    }
}

function moveSnake(){

    xAxisPos += xAxisDir;
    yAxisPos += yAxisDir;

    //Check to see if snakeHead needs to loop around
    if(xAxisPos >= 50){
        xAxisPos = 0;
    } else if (xAxisPos < 0){
        xAxisPos = 48;
    }
        
    if(yAxisPos >= 50){
        yAxisPos = 0;
    } else if (yAxisPos < 0){
        yAxisPos = 48;
    }

    //keep snakes previous position
    prevXAxisPos = snakeHead.style.left;
    prevYAxisPos = snakeHead.style.top;

    //Change snakes position
    snakeHead.style.left = xAxisPos + 'rem';
    snakeHead.style.top = yAxisPos + 'rem';
    
    onApple();
    bodyLogic();
    hitBody();
}

function spawnApple(){
    const xAxisApple = (Math.floor(Math.random() * 25)) * 2;
    const yAxisApple = (Math.floor(Math.random() * 25)) * 2;

    apple.style.left = xAxisApple + 'rem';
    apple.style.top = yAxisApple + 'rem';

}

function onApple(){
    const snakeX = snakeHead.style.left;
    const snakeY = snakeHead.style.top;
    const appleX = apple.style.left;
    const appleY = apple.style.top;

    if (snakeX === appleX && snakeY === appleY){
        addSnake();
        spawnApple();
    }
}

function addSnake(){
    const snakePart = document.createElement('div');
    snakePart.className = 'snake';
    snakePart.style.left = xAxisPos + 'rem';
    snakePart.style.top = yAxisPos + 'rem';
    playArea.appendChild(snakePart);
    snakeBody.push(snakePart);

}

function bodyLogic(){
    if(snakeBody.length < 1)
        return 0;

    //Make the body consistantly move
    const lastBodyPart = snakeBody.pop();
    lastBodyPart.style.left = prevXAxisPos;
    lastBodyPart.style.top = prevYAxisPos;
    snakeBody.unshift(lastBodyPart);
}

function hitBody(){
    for(const bodyPart of snakeBody){
        //If snake hits itself, reset
        if(snakeHead.style.top === bodyPart.style.top && snakeHead.style.left === bodyPart.style.left){
            alert("You lose!");
            snakeBody.length = 0;
            document.querySelectorAll('.snake').forEach(e => e.remove()); //This removes all snake parts from the DOM
            spawnApple();
        }
    }
}



/*
Personal Tips:
This doesn't work as it will end up sending '2rem;2rem;' instead of '4rem': snakeHead.style.left += moveHorizontal + 'rem'; 

Bugs:
Make sure the apple won't spawn on a snake part!
Try to prevent the snake from turning left if it's currently going right.

*/