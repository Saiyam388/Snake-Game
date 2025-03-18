const canvas=document.getElementById(`gamecanva`);
const ctx=canvas.getContext(`2d`);
canvas.width=800;
canvas.height=800;
let snake=[{x:400,y:400}];
let direction=`RIGHT`;
let food={x:100,y:100};
let score=0;
let gameInterval;
const gridSize=20;
function startgame(){
    gameInterval=setInterval(updategame,200);
}
function updategame(){
    movesnake();
    if(checkcollision()){
        gameover();
        return;
    }
    if(eatfood()){
        score++
        document.getElementById(`score`).innerText=`Score:${score}`;
        generatefood();
    }else{
        snake.pop();
    }
    drawgame();
}
function movesnake(){
    let head={...snake[0]};
    if(direction===`UP`)head.y-=gridSize;
    if(direction===`DOWN`)head.y+=gridSize;
    if(direction===`RIGHT`)head.x+=gridSize;
    if(direction===`LEFT`)head.x-=gridSize;
    snake.unshift(head);
}
function checkcollision(){
    let head=snake[0];
    if(head.x<0||head.x>=canvas.width||head.y<0||head.y>=canvas.height){
        return true;
    }
    for(let i=1;i<snake.length;i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            return true;
        }
    }
    return false;
}
function eatfood(){
    let head=snake[0];
    return head.x===food.x && head.y===food.y;
}
function generatefood(){
    food={
        x:Math.floor(Math.random()*(canvas.width/gridSize))*gridSize,
        y:Math.floor(Math.random()*(canvas.height/gridSize))*gridSize,
    };
}
function drawgame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=`red`;
    ctx.fillRect(food.x,food.y,gridSize,gridSize);
    ctx.fillStyle=`Lightgreen`;
    snake.forEach((part,index)=>{
        ctx.fillRect(part.x,part.y,gridSize,gridSize);
    });
}
document.addEventListener(`keydown`,event=>{
    if(event.key===`ArrowDown` && direction!==`DOWN`)direction=`DOWN`;
    if(event.key===`ArrowUp` && direction!==`UP`)direction=`UP`;
    if(event.key===`ArrowLeft` && direction!==`LEFT`)direction=`LEFT`;
    if(event.key===`ArrowRight` && direction!==`RIGHT`)direction=`RIGHT`;
});
function gameover(){
    clearInterval(gameInterval);
    alert(`Game Over!Your Score:${score}`);
    location.reload();
}
startgame();



